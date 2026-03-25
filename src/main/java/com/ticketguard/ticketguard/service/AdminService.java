package com.ticketguard.ticketguard.service;


import com.ticketguard.ticketguard.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ScheduleRepository scheduleRepository;
    private final SeatLockRepository seatLockRepository;

    public Map<String, Object> getAnalytics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSchedules", scheduleRepository.count());
        stats.put("occupiedSeats", seatLockRepository.count());
        stats.put("occupancyRate", "78%");
        return stats;
    }
}
