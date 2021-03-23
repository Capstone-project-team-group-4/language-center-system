/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseTypeRepository;
import com.PhanLam.backend.model.CourseLevel;
import com.PhanLam.backend.model.CourseType;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class CourseLevelService {
    
    // Variables declaration:
    private CourseTypeRepository courseTypeRepository;

    public CourseLevelService (CourseTypeRepository courseTypeRepository){
        this.courseTypeRepository = courseTypeRepository;
    }
    
    @Transactional (readOnly = true)
    public List<CourseLevel> getAllCourseLevelByTypeID (int typeID){
        Optional <CourseType> nullableCourseType;
        CourseType courseType;
        List<CourseLevel> courseLevelHolder;  
        
        nullableCourseType = courseTypeRepository.findById (typeID);
        if (nullableCourseType.isPresent () == false){
            throw new NotFoundException ("Type ID");
        }
        else {
            courseType = nullableCourseType.get ();
            courseLevelHolder = courseType.getCourseLevelList ();
            return courseLevelHolder;
        }
    }
}
