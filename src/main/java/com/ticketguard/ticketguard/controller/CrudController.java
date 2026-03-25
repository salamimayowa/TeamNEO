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

    // Routes
    @GetMapping("/routes")
    public List<Route> getRoutes() { return routeRepository.findAll(); }
    @PostMapping("/routes")
    public Route createRoute(@RequestBody Route route) { return routeRepository.save(route); }

    // Vehicles
    @GetMapping("/vehicles")
    public List<Vehicle> getVehicles() { return vehicleRepository.findAll(); }
    @PostMapping("/vehicles")
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) { return vehicleRepository.save(vehicle); }

    // Schedules
    @GetMapping("/schedules")
    public List<Schedule> getSchedules() { return scheduleRepository.findAll(); }
    @PostMapping("/schedules")
    public Schedule createSchedule(@RequestBody Schedule schedule) { return scheduleRepository.save(schedule); }
}