package com.example.classes.repository;

import com.example.classes.entity.Classroom ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository  extends JpaRepository<Classroom, Long> {
}
