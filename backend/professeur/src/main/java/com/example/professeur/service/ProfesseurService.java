package com.example.professeur.service;


import com.example.professeur.entity.Professeur;
import com.example.professeur.repository.ProfesseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;

    public List<Professeur> getAllProfesseurs() {
        return professeurRepository.findAll();
    }

    public Optional<Professeur> getProfesseurById(Long id) {
        return professeurRepository.findById(id);
    }

    public Professeur addProfesseur(Professeur professeur) {
        return professeurRepository.save(professeur);
    }

    public void deleteProfesseur(Long id) {
        professeurRepository.deleteById(id);
    }

    public Professeur updateProfesseur(Long id, Professeur professeurDetails) {
        Professeur professeur = professeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professeur non trouvé"));

        professeur.setFirstName(professeurDetails.getFirstName());
        professeur.setLastName(professeurDetails.getLastName());
        professeur.setEmail(professeurDetails.getEmail());
        professeur.setPhone(professeurDetails.getPhone());
        professeur.setSpecialization(professeurDetails.getSpecialization());
        professeur.setAddress(professeurDetails.getAddress());
        professeur.setNationality(professeurDetails.getNationality());

        return professeurRepository.save(professeur);
    }
}
