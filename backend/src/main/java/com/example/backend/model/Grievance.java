package com.example.backend.model;

import com.example.backend.enums.GrievanceStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "grievances")
public class Grievance {
    @Id
    private String id;
    private String title;
    private String description;
    private GrievanceStatus status = GrievanceStatus.PENDING;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private List<String> resolutionSteps = new ArrayList<>();
    private List<String> completedSteps = new ArrayList<>();
    private boolean userApprovedResolution;

    // Constructors
    public Grievance() {}

    public Grievance(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public GrievanceStatus getStatus() { return status; }
    public void setStatus(GrievanceStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public List<String> getResolutionSteps() { return resolutionSteps; }
    public void setResolutionSteps(List<String> resolutionSteps) { this.resolutionSteps = resolutionSteps; }
    public List<String> getCompletedSteps() { return completedSteps; }
    public void setCompletedSteps(List<String> completedSteps) { this.completedSteps = completedSteps; }
    public boolean isUserApprovedResolution() { return userApprovedResolution; }
    public void setUserApprovedResolution(boolean userApprovedResolution) {
        this.userApprovedResolution = userApprovedResolution;
    }
}