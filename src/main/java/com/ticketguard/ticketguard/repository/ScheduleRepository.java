package com.ticketguard.ticketguard.repository;

import com.ticketguard.ticketguard.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // Get only available schedules
    List<Schedule> findByStatus(String status);
}