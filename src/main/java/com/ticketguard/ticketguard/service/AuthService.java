package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.model.User;
import com.ticketguard.ticketguard.repository.UserRepository;
import com.ticketguard.ticketguard.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // ─────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────

    private String normalizePhone(String phone) {
        if (phone == null) return null;
        phone = phone.trim().replaceAll("\\s+", "");
        if (phone.startsWith("+")) phone = phone.substring(1);
        if (phone.startsWith("0")) phone = "234" + phone.substring(1);
        return phone;
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) return "PASSENGER";
        return switch (role.toUpperCase().trim()) {
            case "ADMIN"    -> "ADMIN";
            case "DRIVER"   -> "DRIVER";
            case "OPERATOR" -> "OPERATOR";
            default         -> "PASSENGER";
        };
    }

    // ─────────────────────────────────────────
    // REGISTRATION — no token returned
    // ─────────────────────────────────────────

    public Map<String, Object> register(String phone, String fullName,
                                        String email, String password,
                                        String role) {
        // Validate required fields
        if (phone == null || phone.isBlank())
            throw new RuntimeException("Phone number is required.");
        if (fullName == null || fullName.isBlank())
            throw new RuntimeException("Full name is required.");
        if (email == null || email.isBlank())
            throw new RuntimeException("Email is required.");
        if (password == null || password.isBlank())
            throw new RuntimeException("Password is required.");

        phone = normalizePhone(phone);

        // Block duplicate phone
        if (userRepository.findByPhone(phone).isPresent())
            throw new RuntimeException("Phone number already registered.");

        // Block duplicate email
        if (userRepository.findByEmail(email).isPresent())
            throw new RuntimeException("Email already registered.");

        // Create user
        User user = new User();
        user.setPhone(phone);
        user.setFullName(fullName.trim());
        user.setEmail(email.trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(normalizeRole(role));
        userRepository.save(user);

        // No token — just confirmation
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getId());
        response.put("phone", user.getPhone());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("role", user.getRole());
        response.put("message", "Registration successful. Please login to continue.");

        return response;
    }

    // ─────────────────────────────────────────
    // LOGIN — token returned here only
    // ─────────────────────────────────────────

    public Map<String, Object> login(String identifier, String password) {
        if (identifier == null || identifier.isBlank())
            throw new RuntimeException("Email or phone is required.");
        if (password == null || password.isBlank())
            throw new RuntimeException("Password is required.");

        // Find by email first, then by phone
        User user = userRepository.findByEmail(identifier.trim().toLowerCase())
                .orElseGet(() -> userRepository.findByPhone(normalizePhone(identifier))
                        .orElseThrow(() -> new RuntimeException("Account not found. Please register first.")));

        // Check password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Incorrect password.");
        }

        // Generate token only here
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("phone", user.getPhone());
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("role", user.getRole());
        response.put("message", "Login successful.");

        return response;
    }
}