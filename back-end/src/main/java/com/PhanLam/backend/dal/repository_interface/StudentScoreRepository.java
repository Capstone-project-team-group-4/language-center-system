/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.StudentScore;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface StudentScoreRepository 
        extends JpaRepository<StudentScore, Integer> {
    
    @Override
    public StudentScore save (StudentScore studentScore);
}
