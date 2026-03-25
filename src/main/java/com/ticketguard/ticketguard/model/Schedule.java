package com.ticketguard.ticketguard.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "schedules")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Schedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Route route;

    @ManyToOne
    private Vehicle vehicle;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String status = "AVAILABLE";
}
