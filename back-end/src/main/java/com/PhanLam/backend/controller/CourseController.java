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
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
    ){
        DataPage<Course> courseDataPage;
        
        courseDataPage = courseService.getAllCourse (pageIndex, pageSize);
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
}
