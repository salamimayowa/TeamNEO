package com.ticketguard.ticketguard.controller;



import com.ticketguard.ticketguard.model.SeatLock;
import com.ticketguard.ticketguard.service.OfflineSyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/driver")
@RequiredArgsConstructor
public class DriverSyncController {

    private final OfflineSyncService offlineSyncService;

    @PostMapping("/sync-validated")
    public String syncValidated(@RequestBody List<SeatLock> validatedTickets) {
        offlineSyncService.syncDriverValidations(validatedTickets);
        return "Offline validations synced successfully";
    }
}