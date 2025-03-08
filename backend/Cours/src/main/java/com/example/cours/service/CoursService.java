package com.example.cours.service;

import com.example.cours.entity.Course;
import com.example.cours.repository.CoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoursService {
    @Autowired
    private CoursRepository coursRepository;

    public List<Course> getAllCourses() {
        return coursRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return coursRepository.findById(id);
    }

    public Course saveCourse(Course cours) {
        return coursRepository.save(cours);
    }

    public void deleteCourse(Long id) {
        coursRepository.deleteById(id);
    }
}
