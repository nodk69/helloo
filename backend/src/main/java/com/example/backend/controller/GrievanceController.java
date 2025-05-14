package com.example.backend.controller;

import com.example.backend.enums.GrievanceStatus;
import com.example.backend.model.Grievance;
import com.example.backend.service.intface.GrievanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/grievances")
public class GrievanceController {

    private final GrievanceService grievanceService;

    public GrievanceController(GrievanceService grievanceService) {
        this.grievanceService = grievanceService;
    }

    @PostMapping
    public ResponseEntity<Grievance> createGrievance(@RequestBody Grievance grievance) {
        if (grievance.getResolutionSteps() == null || grievance.getResolutionSteps().isEmpty()) {
            throw new IllegalArgumentException("Resolution steps are required");
        }
        return ResponseEntity.ok(grievanceService.createGrievance(grievance));
    }

    @GetMapping
    public ResponseEntity<List<Grievance>> getAllGrievances() {
        return ResponseEntity.ok(grievanceService.getAllGrievances());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Grievance>> getGrievancesByStatus(@PathVariable GrievanceStatus status) {
        return ResponseEntity.ok(grievanceService.getGrievancesByStatus(status));
    }

    @PutMapping("/{id}/complete-step")
    public ResponseEntity<Grievance> completeStep(
            @PathVariable String id,
            @RequestParam String step) {
        return ResponseEntity.ok(grievanceService.completeResolutionStep(id, step));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Grievance> approveResolution(@PathVariable String id) {
        return ResponseEntity.ok(grievanceService.approveResolution(id, true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grievance> getGrievanceById(@PathVariable String id) {
        return ResponseEntity.of(grievanceService.getGrievanceById(id));
    }

    @PutMapping("/{id}/steps")
    public ResponseEntity<Grievance> addResolutionSteps(
            @PathVariable String id,
            @RequestBody List<String> steps) {
        return ResponseEntity.ok(grievanceService.addResolutionSteps(id, steps));
    }
}