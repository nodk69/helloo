package com.example.backend.repository;

import com.example.backend.enums.GrievanceStatus;
import com.example.backend.model.Grievance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrievanceRepository extends MongoRepository<Grievance, String> {
    List<Grievance> findByStatus(GrievanceStatus status);
}