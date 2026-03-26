package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.model.FraudLog;
import com.ticketguard.ticketguard.repository.FraudLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FraudService {

    private final FraudLogRepository fraudLogRepository;

    // Max allowed booking attempts per phone in 5 minutes
    private static final int MAX_ATTEMPTS_PER_PHONE = 3;

    // Max allowed booking attempts per IP in 5 minutes
    private static final int MAX_ATTEMPTS_PER_IP = 5;

    public boolean isFraudulent(String phone, String ip) {
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(5);

        // Rule 1 — too many attempts from same phone in 5 minutes
        long phoneAttempts = fraudLogRepository.countByPhoneAndTimestampAfter(phone, fiveMinutesAgo);
        if (phoneAttempts >= MAX_ATTEMPTS_PER_PHONE) {
            logFraud(phone, ip, "Exceeded " + MAX_ATTEMPTS_PER_PHONE + " booking attempts in 5 minutes");
            return true;
        }

        // Rule 2 — too many attempts from same IP in 5 minutes
        if (ip != null && !ip.equals("unknown")) {
            long ipAttempts = fraudLogRepository.countByIpAddressAndTimestampAfter(ip, fiveMinutesAgo);
            if (ipAttempts >= MAX_ATTEMPTS_PER_IP) {
                logFraud(phone, ip, "Exceeded " + MAX_ATTEMPTS_PER_IP + " booking attempts from same IP in 5 minutes");
                return true;
            }
        }

        // Log this attempt — not fraud yet, just tracking
        logAttempt(phone, ip);
        return false;
    }

    private void logAttempt(String phone, String ip) {
        FraudLog log = new FraudLog();
        log.setPhone(phone);
        log.setIpAddress(ip != null ? ip : "unknown");
        log.setReason("BOOKING_ATTEMPT");
        log.setTimestamp(LocalDateTime.now());
        fraudLogRepository.save(log);
    }

    private void logFraud(String phone, String ip, String reason) {
        FraudLog log = new FraudLog();
        log.setPhone(phone);
        log.setIpAddress(ip != null ? ip : "unknown");
        log.setReason(reason);
        log.setTimestamp(LocalDateTime.now());
        fraudLogRepository.save(log);
    }
}