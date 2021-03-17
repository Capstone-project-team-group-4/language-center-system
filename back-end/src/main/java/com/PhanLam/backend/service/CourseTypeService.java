/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.CourseTypeRepository;
import com.PhanLam.backend.model.CourseType;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false) 
public class CourseTypeService {
    
    // Variables declaration:
    private CourseTypeRepository courseTypeRepository; 

    public CourseTypeService (CourseTypeRepository courseTypeRepository){
        this.courseTypeRepository = courseTypeRepository;
    }
    
    @Transactional (readOnly = true)
    public List<CourseType> getAllCourseType (){
        List<CourseType> courseTypeHolder;
        
        courseTypeHolder = courseTypeRepository.findAll ();
        return courseTypeHolder;
    }
}
