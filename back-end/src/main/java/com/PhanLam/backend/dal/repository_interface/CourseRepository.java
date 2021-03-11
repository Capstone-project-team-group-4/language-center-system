/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.Course;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface CourseRepository extends JpaRepository<Course, Integer> {
    
    @Override
    public Page<Course> findAll (Pageable pagingInformation);
    
    public boolean existsByCourseName (String courseName);
    
    @Override
    public Course save (Course course);

    @Override
    public Optional<Course> findById (Integer courseID);

    @Override
    public void delete (Course course);
}
