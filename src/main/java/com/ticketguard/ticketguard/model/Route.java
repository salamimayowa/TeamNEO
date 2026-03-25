package com.ticketguard.ticketguard.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "routes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Route {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String origin;
    private String destination;
    private double baseFare;
    private String distance;
}
