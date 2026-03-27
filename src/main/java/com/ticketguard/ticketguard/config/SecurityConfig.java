package com.ticketguard.ticketguard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // ✅ Public — no token needed
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/ws/seats/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/routes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/vehicles/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/schedules/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/seats/map/**").permitAll()

                        // 🔒 OPERATOR + ADMIN can create routes, vehicles, schedules
                        .requestMatchers(HttpMethod.POST, "/api/routes/**")
                        .hasAnyRole("OPERATOR", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/vehicles/**")
                        .hasAnyRole("OPERATOR", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/schedules/**")
                        .hasAnyRole("OPERATOR", "ADMIN")

                        // 🔒 PASSENGER + DRIVER + ADMIN can lock and unlock seats
                        .requestMatchers("/api/seats/lock").hasAnyRole("PASSENGER", "DRIVER", "ADMIN")
                        .requestMatchers("/api/seats/unlock").hasAnyRole("PASSENGER", "DRIVER", "ADMIN")
                        .requestMatchers("/api/seats/my-seats/**").hasAnyRole("PASSENGER", "DRIVER", "ADMIN")

                        // 🔒 DRIVER + ADMIN only
                        .requestMatchers("/api/driver/**").hasAnyRole("DRIVER", "ADMIN")

                        // 🔒 ADMIN only
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}