package com.ticketguard.ticketguard.service;


import com.ticketguard.ticketguard.model.User;
import com.ticketguard.ticketguard.repository.UserRepository;
import com.ticketguard.ticketguard.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final Map<String, String> otpStore = new HashMap<>();
    private final Map<String, Long> otpExpiry = new HashMap<>();

    public String sendOtp(String phone) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.put(phone, otp);
        otpExpiry.put(phone, System.currentTimeMillis() + 5 * 60 * 1000);

        System.out.println("🚀 OTP for " + phone + " → " + otp);
        return otp;
    }

    public Map<String, Object> verifyOtp(String phone, String otp) {
        if (!otpStore.containsKey(phone) || !otpStore.get(phone).equals(otp) ||
                System.currentTimeMillis() > otpExpiry.getOrDefault(phone, 0L)) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        User user = userRepository.findByPhone(phone)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setPhone(phone);
                    newUser.setFullName("New User");
                    newUser.setRole("PASSENGER");
                    return userRepository.save(newUser);
                });

        String token = jwtUtil.generateToken(phone);

        otpStore.remove(phone);
        otpExpiry.remove(phone);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("phone", user.getPhone());
        response.put("role", user.getRole());
        response.put("fullName", user.getFullName());
        response.put("message", "Login successful");

        return response;
    }
}