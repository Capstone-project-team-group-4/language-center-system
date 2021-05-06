/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:

import com.PhanLam.backend.model.StudentScore;
import com.PhanLam.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 * @author Phan Lam
 */
public interface StudentScoreRepository
        extends JpaRepository<StudentScore, Integer> {

    @Override
    StudentScore save (StudentScore studentScore);

    List<StudentScore> findAllByUser(User user);
}
