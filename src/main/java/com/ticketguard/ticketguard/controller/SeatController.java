package com.ticketguard.ticketguard.controller;

import com.ticketguard.ticketguard.service.FraudService;
import com.ticketguard.ticketguard.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;
    private final FraudService fraudService;

    @PostMapping("/lock")
    public ResponseEntity<String> lockSeat(
            @RequestBody Map<String, Object> request,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip) {

        Long scheduleId = Long.valueOf(request.get("scheduleId").toString());
        String seatNumber = request.get("seatNumber").toString();
        String userPhone = request.get("phone").toString();

        // Price is optional — defaults to 0 if not provided
        double price = request.containsKey("price")
                ? Double.parseDouble(request.get("price").toString())
                : 0.0;

        if (fraudService.isFraudulent(userPhone, ip != null ? ip : "unknown")) {
            return ResponseEntity.badRequest().body("Fraud detected - too many booking attempts");
        }

        seatService.lockSeat(scheduleId, seatNumber, userPhone, price);
        return ResponseEntity.ok("Seat locked successfully and broadcasted in real-time");
    }
}