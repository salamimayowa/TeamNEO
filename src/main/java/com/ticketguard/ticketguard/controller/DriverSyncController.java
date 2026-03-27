package com.ticketguard.ticketguard.controller;



import com.ticketguard.ticketguard.model.SeatLock;
import com.ticketguard.ticketguard.repository.SeatLockRepository;
import com.ticketguard.ticketguard.repository.UserRepository;
import com.ticketguard.ticketguard.service.OfflineSyncService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/driver")
public class DriverSyncController {

    private final OfflineSyncService offlineSyncService;
    private final SeatLockRepository seatLockRepository;
    private final UserRepository userRepository;

    public DriverSyncController(
            OfflineSyncService offlineSyncService,
            SeatLockRepository seatLockRepository,
            UserRepository userRepository
    ) {
        this.offlineSyncService = offlineSyncService;
        this.seatLockRepository = seatLockRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/sync-validated")
    public String syncValidated(@RequestBody List<SeatLock> validatedTickets) {
        offlineSyncService.syncDriverValidations(validatedTickets);
        return "Offline validations synced successfully";
    }

    @PostMapping("/verify-ticket")
    public Map<String, Object> verifyTicket(@RequestBody Map<String, String> request) {
        String ticketId = request.get("ticketId");

        Map<String, Object> response = new HashMap<>();
        response.put("ticketId", ticketId);

        if (ticketId == null || ticketId.isBlank()) {
            response.put("valid", false);
            response.put("reason", "Missing ticket ID");
            return response;
        }

        Optional<SeatLock> lockOpt = seatLockRepository.findById(ticketId.trim());
        if (lockOpt.isEmpty()) {
            response.put("valid", false);
            response.put("reason", "Ticket not found");
            return response;
        }

        SeatLock lock = lockOpt.get();
        boolean valid = "LOCKED".equalsIgnoreCase(lock.getStatus()) || "USED".equalsIgnoreCase(lock.getStatus());

        response.put("valid", valid);
        response.put("status", lock.getStatus());
        response.put("scheduleId", lock.getScheduleId());
        response.put("seatNumber", lock.getSeatNumber());

        if (valid) {
            String passengerName = userRepository.findByPhone(lock.getUserPhone())
                    .map(user -> user.getFullName())
                    .orElse("Passenger");
            response.put("passengerName", passengerName);
        }

        return response;
    }
}