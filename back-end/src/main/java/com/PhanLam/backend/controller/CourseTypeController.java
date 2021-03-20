/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.CourseType;
import com.PhanLam.backend.service.CourseTypeService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class CourseTypeController {
    
    // Variables declaration:
    private CourseTypeService courseTypeService;

    public CourseTypeController (CourseTypeService courseTypeService){
        this.courseTypeService = courseTypeService;
    }
    
    @GetMapping ("/course-types")
    @ResponseStatus (HttpStatus.OK)
    public List<CourseType> getAllCourseTypeInTheSystem (){
        List<CourseType> courseTypeHolder;
        
        courseTypeHolder = courseTypeService.getAllCourseType ();
        return courseTypeHolder;
    }
}
