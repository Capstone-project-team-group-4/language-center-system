/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:

import com.PhanLam.backend.model.Course;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 *
 * @author Phan Lam
 */
@RestController
public class CourseController {

    // Variables declaration:
    private CourseService courseService;

    public CourseController (CourseService courseService){
        this.courseService = courseService;
    }

    @PostMapping ("/courses")
    @ResponseStatus (HttpStatus.CREATED)
    public void createNewCourse (
            @Valid @RequestBody Course course
    ){
        courseService.createCourse (course);
    }

    @GetMapping ("/courses")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Course> getAllCourse (
            @RequestParam int pageIndex
            , @RequestParam int pageSize
            , @RequestParam String searchParam
    ){
        DataPage<Course> courseDataPage;

        courseDataPage = courseService.getAllCourse (pageIndex, pageSize,searchParam);
        return courseDataPage;
    }

    @PutMapping ("/courses/{courseID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void updateCourse (
            @PathVariable int courseID
            , @Valid @RequestBody Course updatedCourse
    ){
        courseService.updateCourse (courseID, updatedCourse);
    }

    @PatchMapping ("/courses/{courseID}:add-a-student")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void addAStudentToCourse (
            @RequestParam int userID
            , @PathVariable int courseID
    ){
        courseService.addStudentToCourse (userID, courseID);
    }

    @PatchMapping ("/courses/{courseID}:remove-a-student")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void removeAStudentFromCourse (
            @RequestParam int userID
            , @PathVariable int courseID
    ){
        courseService.removeStudentFromCourse (userID, courseID);
    }

    @DeleteMapping ("/courses/{courseID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deleteCourseByID (@PathVariable int courseID){
        courseService.deleteCourseByID (courseID);
    }
    
    @GetMapping("/")
    @ResponseStatus (HttpStatus.OK)
    public List<Course> getAllUserCourse(){
        return courseService.getAllCourse();
    }
    
    @GetMapping("/courses/{courseID}")
    @ResponseStatus(HttpStatus.OK)
    public Course getCourseById(@PathVariable("courseID") Integer courseID){
        return courseService.getCourseById(courseID);
    }
    
    @GetMapping("/getCourseByName")
    @ResponseStatus(HttpStatus.OK)
    public Course getCourseByName(@RequestParam("courseName") String courseName){
        return courseService.getCourseByName(courseName);
    }
    
    @GetMapping("/myCourses")
    public List<Course> getAllCourseCurrentsLogin(@RequestParam(value = "userName") String userName){
        return courseService.getCoursesByCurrentUserName(userName);
    }

    @GetMapping ("/courses-for-create-class")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<Course> getAllCourseAvailableToCreateClass (
            @RequestParam int pageIndex
            , @RequestParam int pageSize
            , @RequestParam int spareTimeId
    ){
        DataPage<Course> courseDataPage;

        courseDataPage = courseService.getAllCourseAvailableToCreateClass (pageIndex, pageSize,spareTimeId);
        return courseDataPage;
    }
}
