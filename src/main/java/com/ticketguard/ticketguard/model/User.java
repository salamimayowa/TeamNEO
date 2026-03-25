package com.ticketguard.ticketguard.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String phone;

    private String fullName;
    private String email;
    private String role; // PASSENGER, DRIVER, OPERATOR, ADMIN

    private LocalDateTime createdAt = LocalDateTime.now();
}