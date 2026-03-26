package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.repository.SeatLockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import com.ticketguard.ticketguard.model.SeatLock;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class SeatExpiryScheduler {

    private final SeatLockRepository seatLockRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // Runs every 60 seconds
    @Scheduled(fixedRate = 60000)
    public void expireOldLocks() {
        List<SeatLock> expiredLocks = seatLockRepository
                .findByStatusAndExpiresAtBefore("LOCKED", LocalDateTime.now());

        if (expiredLocks.isEmpty()) return;

        expiredLocks.forEach(lock -> {
            lock.setStatus("EXPIRED");
            seatLockRepository.save(lock);

            // Broadcast seat is now available again
            messagingTemplate.convertAndSend(
                    "/topic/seat-updates/" + lock.getScheduleId(),
                    Map.of(
                            "seatNumber", lock.getSeatNumber(),
                            "status", "EXPIRED",
                            "userPhone", lock.getUserPhone()
                    )
            );

            System.out.println("⏰ Seat " + lock.getSeatNumber()
                    + " on schedule " + lock.getScheduleId() + " lock expired and released.");
        });

        System.out.println("✅ Expiry check done. " + expiredLocks.size() + " lock(s) expired.");
    }
}