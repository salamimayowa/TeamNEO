package com.ticketguard.ticketguard.controller;

import com.ticketguard.ticketguard.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        authService.sendOtp(phone);
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        String otp = request.get("otp");
        Map<String, Object> response = authService.verifyOtp(phone, otp);
        return ResponseEntity.ok(response);
    }
}