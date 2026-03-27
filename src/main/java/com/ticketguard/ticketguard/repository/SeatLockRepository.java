package com.ticketguard.ticketguard.repository;

import com.ticketguard.ticketguard.model.SeatLock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeatLockRepository extends JpaRepository<SeatLock, String> {

    List<SeatLock> findByScheduleIdAndStatus(Long scheduleId, String status);

    long countByStatus(String status);

    long countByScheduleId(Long scheduleId);

    List<SeatLock> findByUserPhoneAndStatus(String userPhone, String status);

    Optional<SeatLock> findByScheduleIdAndSeatNumber(Long scheduleId, String seatNumber);

    List<SeatLock> findByUserPhone(String userPhone);

    @Query("SELECT COALESCE(SUM(s.price), 0) FROM SeatLock s WHERE s.status IN ('LOCKED', 'USED')")
    double getTotalRevenue();
}