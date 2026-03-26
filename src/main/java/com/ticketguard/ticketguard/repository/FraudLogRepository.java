package com.ticketguard.ticketguard.repository;

import com.ticketguard.ticketguard.model.FraudLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface FraudLogRepository extends JpaRepository<FraudLog, Long> {

    // Check if any fraud log exists after a given time
    boolean existsByPhoneAndTimestampAfter(String phone, LocalDateTime after);

    // Count booking attempts in a time window
    long countByPhoneAndTimestampAfter(String phone, LocalDateTime after);

    // Count by IP in a time window
    long countByIpAddressAndTimestampAfter(String ipAddress, LocalDateTime after);
}