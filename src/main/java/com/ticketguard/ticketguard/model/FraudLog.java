package com.ticketguard.ticketguard.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fraud_logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class FraudLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phone;
    private String ipAddress;
    private String reason;
    private LocalDateTime timestamp = LocalDateTime.now();
}