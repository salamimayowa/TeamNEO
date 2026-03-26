package com.ticketguard.ticketguard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TicketguardApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketguardApplication.class, args);
	}

}
