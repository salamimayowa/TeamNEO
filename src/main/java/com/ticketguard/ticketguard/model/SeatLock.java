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
    private String status = "LOCKED"; // LOCKED, USED, EXPIRED
    private LocalDateTime lockedAt = LocalDateTime.now();
    private LocalDateTime expiresAt;
    private double price; // fare paid for this seat
}