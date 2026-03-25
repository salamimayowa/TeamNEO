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

    // ─────────────────────────────────────────
    // REGISTRATION
    // ─────────────────────────────────────────

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        String phone    = request.get("phone");
        String fullName = request.get("fullName");
        String email    = request.get("email");
        String password = request.get("password");
        String role     = request.get("role");     // optional — defaults to PASSENGER
        Map<String, Object> response = authService.register(phone, fullName, email, password, role);
        return ResponseEntity.ok(response);
    }

    // ─────────────────────────────────────────
    // LOGIN
    // ─────────────────────────────────────────

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String identifier = request.get("email");   // accepts email or phone
        if (identifier == null) identifier = request.get("phone");
        String password = request.get("password");
        Map<String, Object> response = authService.login(identifier, password);
        return ResponseEntity.ok(response);
    }
}