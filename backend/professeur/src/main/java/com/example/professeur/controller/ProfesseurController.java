package com.example.professeur.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.professeur.entity.Professeur;
import com.example.professeur.service.ProfesseurService;

@RestController
@RequestMapping("/professeurs")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfesseurController {

    @Autowired
    private ProfesseurService professeurService;  
    @GetMapping
    public List<Professeur> getAllProfesseurs() { 
        return professeurService.getAllProfesseurs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professeur> getProfesseurById(@PathVariable Long id) {  
        Optional<Professeur> professeur = professeurService.getProfesseurById(id);
        return professeur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Professeur addProfesseur(@RequestBody Professeur professeur) {  
        return professeurService.addProfesseur(professeur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfesseur(@PathVariable Long id) {  
        professeurService.deleteProfesseur(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professeur> updateProfesseur(@PathVariable Long id, @RequestBody Professeur professeur) {  
        Professeur updatedProfesseur = professeurService.updateProfesseur(id, professeur);
        return ResponseEntity.ok(updatedProfesseur);
    }
}
