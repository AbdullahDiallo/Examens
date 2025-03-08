package com.example.timetable.controller;

import com.example.timetable.entity.Timetable;
import com.example.timetable.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/timetables")
@CrossOrigin(origins = "http://localhost:4200")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public List<Timetable> getAllTimetables() {
        return timetableService.getAllTimetables();
    }

    @GetMapping("/{id}")
    public Optional<Timetable> getTimetableById(@PathVariable Long id) {
        return timetableService.getTimetableById(id);
    }

    @GetMapping("/classroom/{classroomId}")
    public List<Timetable> getTimetablesByClassroomId(@PathVariable Long classroomId) {
        return timetableService.getTimetablesByClassroomId(classroomId);
    }

    @PostMapping
    public Timetable saveTimetable(@RequestBody Timetable timetable) {
        // Vérifier si la classe existe dans le service classesdb
        String classServiceUrl = "http://localhost:8084/classrooms/" + timetable.getClassroomId();
        Boolean classExists = restTemplate.getForObject(classServiceUrl, Boolean.class);

        if (classExists != null && classExists) {
            return timetableService.saveTimetable(timetable);
        } else {
            throw new IllegalArgumentException("La classe avec l'ID " + timetable.getClassroomId() + " n'existe pas.");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteTimetable(@PathVariable Long id) {
        timetableService.deleteTimetable(id);
    }
}
