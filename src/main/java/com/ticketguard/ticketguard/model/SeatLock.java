package com.ticketguard.ticketguard.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "seat_locks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SeatLock {
    @Id
    private String lockId; // format: scheduleId-seatNumber

    private Long scheduleId;
    private String seatNumber;
    private String userPhone;
    private String status = "LOCKED"; // LOCKED, USED
    private LocalDateTime lockedAt = LocalDateTime.now();
    private double price;

    public Long getScheduleId() {
        return scheduleId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public String getStatus() {
        return status;
    }
}