/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.CourseType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface CourseTypeRepository 
        extends JpaRepository<CourseType, Integer> {

    @Override
    public List<CourseType> findAll ();

    @Override
    public Optional<CourseType> findById (Integer typeID);
}
