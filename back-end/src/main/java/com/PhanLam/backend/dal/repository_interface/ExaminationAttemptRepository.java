/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.Examination;
import com.PhanLam.backend.model.ExaminationAttempt;
import com.PhanLam.backend.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface ExaminationAttemptRepository 
        extends JpaRepository <ExaminationAttempt, Integer> {
    
    public Optional<ExaminationAttempt> findByUserAndExamination (
            User user
            , Examination examination
    );

    @Override
    public ExaminationAttempt save (ExaminationAttempt ExamAttempt);
}
