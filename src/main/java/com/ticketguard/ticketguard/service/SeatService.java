package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.model.SeatLock;
import com.ticketguard.ticketguard.repository.SeatLockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatLockRepository seatLockRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public void lockSeat(Long scheduleId, String seatNumber, String userPhone, double price) {
        String lockId = scheduleId + "-" + seatNumber;

        SeatLock lock = new SeatLock();
        lock.setLockId(lockId);
        lock.setScheduleId(scheduleId);
        lock.setSeatNumber(seatNumber);
        lock.setUserPhone(userPhone);
        lock.setStatus("LOCKED");
        lock.setLockedAt(LocalDateTime.now());
        lock.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        lock.setPrice(price);

        seatLockRepository.save(lock);

        messagingTemplate.convertAndSend(
                "/topic/seat-updates/" + scheduleId,
                Map.of(
                        "seatNumber", seatNumber,
                        "status", "LOCKED",
                        "userPhone", userPhone,
                        "expiresAt", lock.getExpiresAt().toString()
                )
        );
    }

    public List<SeatLock> getLockedSeats(Long scheduleId) {
        return seatLockRepository.findByScheduleIdAndStatus(scheduleId, "LOCKED");
    }
}