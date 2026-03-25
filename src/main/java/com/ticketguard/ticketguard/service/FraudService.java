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

    public boolean isFraudulent(String phone, String ip) {
        boolean recentMultiple = fraudLogRepository.existsByPhoneAndTimestampAfter(phone, LocalDateTime.now().minusMinutes(5));
        if (recentMultiple) {
            fraudLogRepository.save(new FraudLog(null, phone, ip, "Multiple booking attempts in short time", null));
            return true;
        }
        return false;
    }
}
