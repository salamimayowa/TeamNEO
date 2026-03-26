package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.repository.ScheduleRepository;
import com.ticketguard.ticketguard.repository.SeatLockRepository;
import com.ticketguard.ticketguard.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ScheduleRepository scheduleRepository;
    private final SeatLockRepository seatLockRepository;
    private final VehicleRepository vehicleRepository;

    public Map<String, Object> getAnalytics() {

        long totalSchedules = scheduleRepository.count();
        long totalSeats = vehicleRepository.findAll()
                .stream()
                .mapToLong(v -> v.getTotalSeats())
                .sum();
        long occupiedSeats = seatLockRepository.countByStatus("LOCKED")
                + seatLockRepository.countByStatus("USED");
        double totalRevenue = seatLockRepository.getTotalRevenue();

        // Calculate occupancy rate dynamically
        double occupancyRate = totalSeats > 0
                ? Math.round((occupiedSeats * 100.0 / totalSeats) * 10.0) / 10.0
                : 0.0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSchedules", totalSchedules);
        stats.put("totalSeats", totalSeats);
        stats.put("occupiedSeats", occupiedSeats);
        stats.put("availableSeats", totalSeats - occupiedSeats);
        stats.put("occupancyRate", occupancyRate + "%");
        stats.put("totalRevenue", "₦" + String.format("%,.2f", totalRevenue));

        return stats;
    }
}