package com.ticketguard.ticketguard.controller;

import com.ticketguard.ticketguard.model.*;
import com.ticketguard.ticketguard.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CrudController {

    private final RouteRepository routeRepository;
    private final VehicleRepository vehicleRepository;
    private final ScheduleRepository scheduleRepository;

    // ─────────────────────────────────────────
    // ROUTES
    // ─────────────────────────────────────────

    @GetMapping("/routes")
    public List<Route> getRoutes() {
        return routeRepository.findAll();
    }

    @PostMapping("/routes")
    public Route createRoute(@RequestBody Route route) {
        return routeRepository.save(route);
    }

    // ─────────────────────────────────────────
    // VEHICLES
    // ─────────────────────────────────────────

    @GetMapping("/vehicles")
    public List<Vehicle> getVehicles() {
        return vehicleRepository.findAll();
    }

    @PostMapping("/vehicles")
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // ─────────────────────────────────────────
    // SCHEDULES
    // ─────────────────────────────────────────

    @GetMapping("/schedules")
    public List<Schedule> getSchedules() {
        return scheduleRepository.findAll();
    }

    @GetMapping("/schedules/available")
    public List<Schedule> getAvailableSchedules() {
        return scheduleRepository.findByStatus("AVAILABLE");
    }

    @PostMapping("/schedules")
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
}