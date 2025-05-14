package com.example.backend.service.impl;

import com.example.backend.model.Grievance;
import com.example.backend.enums.GrievanceStatus;
import com.example.backend.repository.GrievanceRepository;
import com.example.backend.service.intface.GrievanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GrievanceServiceImpl implements GrievanceService {

    private final GrievanceRepository grievanceRepository;

    public GrievanceServiceImpl(GrievanceRepository grievanceRepository) {
        this.grievanceRepository = grievanceRepository;
    }

    @Override
    public Grievance createGrievance(Grievance grievance) {
        grievance.setStatus(GrievanceStatus.PENDING);
        grievance.setCreatedAt(LocalDateTime.now());
        grievance.setUpdatedAt(LocalDateTime.now());
        return grievanceRepository.save(grievance);
    }

    @Override
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    @Override
    public Optional<Grievance> getGrievanceById(String id) {
        return grievanceRepository.findById(id);
    }

    @Override
    public List<Grievance> getGrievancesByStatus(GrievanceStatus status) {
        return grievanceRepository.findByStatus(status);
    }

    @Override
    public Grievance completeResolutionStep(String id, String step) {
        return grievanceRepository.findById(id)
                .map(grievance -> {
                    if (!grievance.getResolutionSteps().contains(step)) {
                        throw new IllegalArgumentException("Step not found in resolution steps");
                    }
                    grievance.getCompletedSteps().add(step);
                    grievance.setUpdatedAt(LocalDateTime.now());
                    return grievanceRepository.save(grievance);
                })
                .orElseThrow(() -> new IllegalArgumentException("Grievance not found with id: " + id));
    }

    @Override
    public Grievance approveResolution(String id, boolean approved) {
        return grievanceRepository.findById(id)
                .map(grievance -> {
                    grievance.setUserApprovedResolution(approved);
                    grievance.setStatus(approved ? GrievanceStatus.RESOLVED : GrievanceStatus.IN_PROGRESS);
                    grievance.setUpdatedAt(LocalDateTime.now());
                    return grievanceRepository.save(grievance);
                })
                .orElseThrow(() -> new IllegalArgumentException("Grievance not found with id: " + id));
    }

    @Override
    public Grievance addResolutionSteps(String id, List<String> steps) {
        return grievanceRepository.findById(id)
                .map(grievance -> {
                    grievance.getResolutionSteps().addAll(steps);
                    grievance.setUpdatedAt(LocalDateTime.now());
                    return grievanceRepository.save(grievance);
                })
                .orElseThrow(() -> new IllegalArgumentException("Grievance not found with id: " + id));
    }
}