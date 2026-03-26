package com.ticketguard.ticketguard.repository;

import com.ticketguard.ticketguard.model.SeatLock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SeatLockRepository extends JpaRepository<SeatLock, String> {

    // Get all locked seats for a schedule
    List<SeatLock> findByScheduleIdAndStatus(Long scheduleId, String status);

    // Count seats by status
    long countByStatus(String status);

    // Find all expired locks that are still marked as LOCKED
    List<SeatLock> findByStatusAndExpiresAtBefore(String status, LocalDateTime time);

    // Sum of all revenue from LOCKED and USED seats
    @Query("SELECT COALESCE(SUM(s.price), 0) FROM SeatLock s WHERE s.status IN ('LOCKED', 'USED')")
    double getTotalRevenue();

    // Count seats by scheduleId
    long countByScheduleId(Long scheduleId);
}