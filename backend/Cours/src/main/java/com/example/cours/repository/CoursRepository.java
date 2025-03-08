package com.example.cours.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cours.entity.Course;

@Repository
public interface CoursRepository extends JpaRepository<Course, Long> {
}
