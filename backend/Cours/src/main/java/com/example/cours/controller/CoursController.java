package com.example.cours.controller;

import com.example.cours.entity.Course;
import com.example.cours.service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cours")
@CrossOrigin(origins = "http://localhost:4200")
public class CoursController {
    @Autowired
    private CoursService coursService;

    @GetMapping
    public List<Course> getAllCourses() {
        return coursService.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> cours = coursService.getCourseById(id);
        return cours.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course cours) {
        return ResponseEntity.ok(coursService.saveCourse(cours));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updatedCours) {
        Optional<Course> existingCours = coursService.getCourseById(id);
        if (existingCours.isPresent()) {
            Course cours = existingCours.get();
            cours.setTitle(updatedCours.getTitle());
            cours.setDescription(updatedCours.getDescription());
            cours.setDuration(updatedCours.getDuration());
            return ResponseEntity.ok(coursService.saveCourse(cours));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        if (coursService.getCourseById(id).isPresent()) {
            coursService.deleteCourse(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
