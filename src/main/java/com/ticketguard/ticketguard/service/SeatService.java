package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.model.SeatLock;
import com.ticketguard.ticketguard.model.Vehicle;
import com.ticketguard.ticketguard.model.Schedule;
import com.ticketguard.ticketguard.repository.SeatLockRepository;
import com.ticketguard.ticketguard.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatLockRepository seatLockRepository;
    private final ScheduleRepository scheduleRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // ─────────────────────────────────────────
    // LOCK A SEAT
    // ─────────────────────────────────────────

    public void lockSeat(Long scheduleId, String seatNumber, String userPhone, double price) {
        String lockId = scheduleId + "-" + seatNumber;

        // Check if seat is already locked by someone else
        seatLockRepository.findByScheduleIdAndSeatNumber(scheduleId, seatNumber)
                .ifPresent(existing -> {
                    if ("LOCKED".equals(existing.getStatus())) {
                        throw new RuntimeException("Seat " + seatNumber + " is already locked by another passenger.");
                    }
                });

        SeatLock lock = new SeatLock();
        lock.setLockId(lockId);
        lock.setScheduleId(scheduleId);
        lock.setSeatNumber(seatNumber);
        lock.setUserPhone(userPhone);
        lock.setStatus("LOCKED");
        lock.setLockedAt(LocalDateTime.now());
        lock.setPrice(price);

        seatLockRepository.save(lock);

        broadcast(scheduleId, seatNumber, "LOCKED", userPhone);
    }

    // ─────────────────────────────────────────
    // UNLOCK A SEAT
    // ─────────────────────────────────────────

    public void unlockSeat(Long scheduleId, String seatNumber, String userPhone) {
        String lockId = scheduleId + "-" + seatNumber;

        SeatLock lock = seatLockRepository.findById(lockId)
                .orElseThrow(() -> new RuntimeException("Seat " + seatNumber + " is not locked."));

        // Only the passenger who locked it can unlock it
        if (!lock.getUserPhone().equals(userPhone)) {
            throw new RuntimeException("You can only unlock seats you have locked.");
        }

        // Cannot unlock a seat that has already been validated
        if ("USED".equals(lock.getStatus())) {
            throw new RuntimeException("Seat " + seatNumber + " has already been validated and cannot be unlocked.");
        }

        seatLockRepository.delete(lock);

        broadcast(scheduleId, seatNumber, "AVAILABLE", userPhone);
    }

    // ─────────────────────────────────────────
    // GET SEAT MAP FOR A SCHEDULE
    // ─────────────────────────────────────────

    public Map<String, Object> getSeatMap(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found."));

        Vehicle vehicle = schedule.getVehicle();
        int totalSeats = vehicle.getTotalSeats();

        List<SeatLock> lockedSeats = seatLockRepository.findByScheduleIdAndStatus(scheduleId, "LOCKED");
        List<SeatLock> usedSeats = seatLockRepository.findByScheduleIdAndStatus(scheduleId, "USED");

        List<String> lockedSeatNumbers = lockedSeats.stream()
                .map(SeatLock::getSeatNumber).toList();
        List<String> usedSeatNumbers = usedSeats.stream()
                .map(SeatLock::getSeatNumber).toList();

        // Build seat list
        List<Map<String, Object>> seats = new ArrayList<>();
        for (int i = 1; i <= totalSeats; i++) {
            String seatNumber = "A" + i;
            Map<String, Object> seat = new HashMap<>();
            seat.put("seatNumber", seatNumber);

            if (usedSeatNumbers.contains(seatNumber)) {
                seat.put("status", "USED");
                seat.put("available", false);
            } else if (lockedSeatNumbers.contains(seatNumber)) {
                seat.put("status", "LOCKED");
                seat.put("available", false);
            } else {
                seat.put("status", "AVAILABLE");
                seat.put("available", true);
            }

            seats.add(seat);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("scheduleId", scheduleId);
        response.put("totalSeats", totalSeats);
        response.put("availableSeats", totalSeats - lockedSeatNumbers.size() - usedSeatNumbers.size());
        response.put("lockedSeats", lockedSeatNumbers.size());
        response.put("usedSeats", usedSeatNumbers.size());
        response.put("seats", seats);

        return response;
    }

    // ─────────────────────────────────────────
    // GET MY LOCKED SEATS
    // ─────────────────────────────────────────

    public List<SeatLock> getMySeats(String userPhone) {
        return seatLockRepository.findByUserPhoneAndStatus(userPhone, "LOCKED");
    }

    // ─────────────────────────────────────────
    // BROADCAST
    // ─────────────────────────────────────────

    private void broadcast(Long scheduleId, String seatNumber, String status, String userPhone) {
        messagingTemplate.convertAndSend(
                "/topic/seat-updates/" + scheduleId,
                Map.of(
                        "seatNumber", seatNumber,
                        "status", status,
                        "userPhone", userPhone
                )
        );
    }

    public List<SeatLock> getLockedSeats(Long scheduleId) {
        return seatLockRepository.findByScheduleIdAndStatus(scheduleId, "LOCKED");
    }
}