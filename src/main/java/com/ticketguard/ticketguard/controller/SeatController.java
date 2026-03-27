package com.ticketguard.ticketguard.controller;

import com.ticketguard.ticketguard.model.SeatLock;
import com.ticketguard.ticketguard.service.FraudService;
import com.ticketguard.ticketguard.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;
    private final FraudService fraudService;

    // ─────────────────────────────────────────
    // LOCK A SEAT
    // ─────────────────────────────────────────

    @PostMapping("/lock")
    public ResponseEntity<String> lockSeat(
            @RequestBody Map<String, Object> request,
            @RequestHeader(value = "X-Forwarded-For", required = false) String ip) {

        Long scheduleId = Long.valueOf(request.get("scheduleId").toString());
        String seatNumber = request.get("seatNumber").toString();
        String userPhone = request.get("phone").toString();
        double price = request.containsKey("price")
                ? Double.parseDouble(request.get("price").toString())
                : 0.0;

        if (fraudService.isFraudulent(userPhone, ip != null ? ip : "unknown")) {
            return ResponseEntity.badRequest().body("Fraud detected - too many booking attempts");
        }

        seatService.lockSeat(scheduleId, seatNumber, userPhone, price);
        return ResponseEntity.ok("Seat " + seatNumber + " locked successfully.");
    }

    // ─────────────────────────────────────────
    // UNLOCK A SEAT (re-pick)
    // ─────────────────────────────────────────

    @PostMapping("/unlock")
    public ResponseEntity<String> unlockSeat(
            @RequestBody Map<String, Object> request) {

        Long scheduleId = Long.valueOf(request.get("scheduleId").toString());
        String seatNumber = request.get("seatNumber").toString();
        String userPhone = request.get("phone").toString();

        seatService.unlockSeat(scheduleId, seatNumber, userPhone);
        return ResponseEntity.ok("Seat " + seatNumber + " unlocked. You can now pick another seat.");
    }

    // ─────────────────────────────────────────
    // GET SEAT MAP FOR A SCHEDULE
    // ─────────────────────────────────────────

    @GetMapping("/map/{scheduleId}")
    public ResponseEntity<Map<String, Object>> getSeatMap(@PathVariable Long scheduleId) {
        return ResponseEntity.ok(seatService.getSeatMap(scheduleId));
    }

    // ─────────────────────────────────────────
    // GET MY LOCKED SEATS
    // ─────────────────────────────────────────

    @GetMapping("/my-seats/{phone}")
    public ResponseEntity<List<SeatLock>> getMySeats(@PathVariable String phone) {
        return ResponseEntity.ok(seatService.getMySeats(phone));
    }
}