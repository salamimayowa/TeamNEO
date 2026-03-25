package com.ticketguard.ticketguard.repository;

import com.ticketguard.ticketguard.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;



@Repository
public interface SeatLockRepository extends JpaRepository<SeatLock, String> {
    List<SeatLock> findByScheduleIdAndStatus(Long scheduleId, String status);
}
