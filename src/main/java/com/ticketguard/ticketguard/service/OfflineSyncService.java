package com.ticketguard.ticketguard.service;

import com.ticketguard.ticketguard.model.SeatLock;
import com.ticketguard.ticketguard.repository.SeatLockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfflineSyncService {

    private final SeatLockRepository seatLockRepository;

    public void syncDriverValidations(List<SeatLock> validatedTickets) {
        validatedTickets.forEach(lock -> {
            lock.setStatus("USED");
            seatLockRepository.save(lock);
        });
    }
}