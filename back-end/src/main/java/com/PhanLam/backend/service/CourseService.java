/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.model.Course;
import com.PhanLam.backend.model.DataPage;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class CourseService {
    
    // Variables declaration:
    private CourseRepository courseRepository; 

    public CourseService (CourseRepository courseRepository){
        this.courseRepository = courseRepository;
    }
    
    public void createCourse (Course course){
        String courseName;
        boolean courseAlreadyExist;
        Date dateCreated;
        
        courseName = course.getCourseName ();
        courseAlreadyExist = courseRepository.existsByCourseName (courseName);
        if (courseAlreadyExist == true){
            throw new AlreadyExistException ("Course Name");
        }
        else {
            dateCreated = new Date ();
            course.setDateCreated (dateCreated);
            courseRepository.save (course);
        }
    }
    
    @Transactional (readOnly = true)
    public DataPage<Course> getAllCourse (
            int pageIndex
            , int pageSize
    ){
        ArrayList<Course> courseHolder;
        PageRequest pagingInformation;
        Page<Course> coursePage;
        TypedSort<Course> courseSortInformation;
        Sort sortInformation; 
        DataPage<Course> courseDataPage;
        
        if ((pageIndex >= 0) && (pageSize > 0)){
            courseSortInformation = Sort.sort (Course.class);
            sortInformation 
                = courseSortInformation
                    .by (Course::getCourseName).ascending ();
            pagingInformation = PageRequest.of (
                    pageIndex
                    , pageSize
                    , sortInformation
            );
            coursePage = courseRepository.findAll (pagingInformation);
            courseHolder = new ArrayList<> (coursePage.getContent ());
            courseDataPage = new DataPage<> (
                    coursePage.getTotalPages ()
                    , courseHolder
            );
            return courseDataPage;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator () 
                    + "Parameter name: pageNumber, pageSize"
            );
        }
    }
    
    public void updateCourse (int courseID, Course updatedCourse){
        Optional <Course> nullableCourse;
        Course course;
        Date lastModified;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course ID");
        }
        else {
            course = nullableCourse.get ();
            course.setCourseName (updatedCourse.getCourseName ());
            course.setDescription (updatedCourse.getDescription ());
            course.setCourseType (updatedCourse.getCourseType ());
            course.setCourseLevel (updatedCourse.getCourseLevel ());
            course.setTuitionFee (updatedCourse.getTuitionFee ());
            lastModified = new Date ();
            course.setLastModified (lastModified);
        }
    }
    
    public void deleteCourseByID (int courseID){
        Optional <Course> nullableCourse;
        Course course;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course ID");
        }
        else {
            course = nullableCourse.get ();
            courseRepository.delete (course);
        }
    }
}
