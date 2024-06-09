package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationResult;

import java.util.List;

@Repository
public interface EvaluationResultRepository extends JpaRepository<EvaluationResult, String> {

    }
