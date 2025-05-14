package com.example.backend.service.intface;

import com.example.backend.model.Grievance;
import com.example.backend.enums.GrievanceStatus;

import java.util.List;
import java.util.Optional;

public interface GrievanceService {

    // Create
    Grievance createGrievance(Grievance grievance);

    // Read
    List<Grievance> getAllGrievances();
    Optional<Grievance> getGrievanceById(String id);
    List<Grievance> getGrievancesByStatus(GrievanceStatus status);

    // Update
    Grievance completeResolutionStep(String id, String step);
    Grievance approveResolution(String id, boolean approved);
    Grievance addResolutionSteps(String id, List<String> steps);

    // Note: If you need update/delete methods, add them here:
    // Grievance updateGrievance(String id, Grievance grievance);
    // void deleteGrievance(String id);
}