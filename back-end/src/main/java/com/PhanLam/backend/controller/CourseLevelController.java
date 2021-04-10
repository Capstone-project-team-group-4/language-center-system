/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.CourseLevel;
import com.PhanLam.backend.service.CourseLevelService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class CourseLevelController {
    
    // Variables declaration:
    private CourseLevelService courseLevelService;

    public CourseLevelController (CourseLevelService courseLevelService){
        this.courseLevelService = courseLevelService;
    }
    
    @GetMapping ("/course-types/{typeID}/course-levels")
    @ResponseStatus (HttpStatus.OK)
    public List<CourseLevel> getAllCourseLevelByTypeID (@PathVariable int typeID){
        List<CourseLevel> courseLevelHolder;
        
        courseLevelHolder 
            = courseLevelService.getAllCourseLevelByTypeID (typeID);
        return courseLevelHolder;
    }
}
