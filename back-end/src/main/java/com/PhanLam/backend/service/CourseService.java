/*
 * CourseService.java
 *
 * All Rights Reserved
 * Copyright (c) 2021 FPT University
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.CourseRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.Course;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.model.User;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * CourseService class <br>
 * 
 * <pre>
 * Service class for managing Course objects
 * </pre>
 * 
 * @author roboc
 * @author Phan Lam
 * @version 1.0
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class CourseService {
    
    /**
     * Variables declaration:
     * - userRepository
     * - courseRepository
     */
    private CourseRepository courseRepository;
    private UserRepository userRepository;
    
    /**
     * Constructor<br>
     * 
     * <pre>
     * This constructs a CourseService with a specified 
     * userRepository and courseRepository
     * </pre>
     * 
     * @param courseRepository
     * @param userRepository 
     */
    public CourseService (
            CourseRepository courseRepository
            , UserRepository userRepository
    ){
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }
    
    /**
     * createCourse<br>
     * 
     * <pre>
     * Method will create a Course
     * </pre>
     * 
     * @param course 
     */
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
    
    /**
     * getAllCourse<br>
     * 
     * <pre>
     * Method will get all courses
     * </pre>
     * 
     * @param pageIndex
     * @param pageSize
     * @return courseDatapage
     * @throws InvalidRequestArgumentException
     */
    @Transactional (readOnly = true)
    public DataPage<Course> getAllCourse (
            int pageIndex
            , int pageSize
    ){
        List<Course> courseHolder;
        PageRequest pagingInformation;
        Page<Course> coursePage;
        TypedSort<Course> courseSortInformation;
        Sort sortInformation; 
        DataPage<Course> courseDataPage;
        long totalRowCount;
        
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
            totalRowCount = coursePage.getTotalElements ();  
            courseHolder = coursePage.getContent ();
            courseDataPage = new DataPage<> (totalRowCount, courseHolder);
            return courseDataPage;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page index number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator () 
                    + "Parameter name: pageIndex, pageSize"
            );
        }
    }
    
    /**
     * updateCourse<br>
     * 
     * <pre>
     * Method will update information of course
     * </pre>
     * 
     * @param courseID
     * @param updatedCourse 
     */
    public void updateCourse (int courseID, Course updatedCourse){
        boolean courseExists;
        Date lastModified;
        
        courseExists = courseRepository.existsById (courseID);
        if (courseExists == false){
            throw new NotFoundException ("Course");
        }
        else {
            lastModified = new Date ();
            updatedCourse.setLastModified (lastModified);
            courseRepository.save (updatedCourse);
        }
    }
    
    /**
     * deleteCourseByID<br>
     * 
     * <pre>
     * Method will delete a course by courseID
     * </pre>
     * 
     * @param courseID 
     */
    public void deleteCourseByID (int courseID){
        Optional <Course> nullableCourse;
        Course course;
        
        nullableCourse = courseRepository.findById (courseID);
        if (nullableCourse.isPresent () == false){
            throw new NotFoundException ("Course");
        }
        else {
            course = nullableCourse.get ();
            courseRepository.delete (course);
        }
    }
    
    /**
     * addStudentToCourse<br>
     * 
     * <pre>
     * Method will add student to one or many courses
     * </pre>
     * 
     * @param userID
     * @param courseID 
     * @throws InvalidRequestArgumentException
     */
    public void addStudentToCourse (int userID, int courseID){
        Optional<User> nullableUser;
        User user;
        List<Role> roleHolder;
        int i;
        Role role;
        boolean thisUserIsStudent;
        Optional <Course> nullableCourse;
        Course course;
        List<User> userList;
        User userInTheCourse;
        boolean alreadyExistsInTheCourse;
        
        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("Student");
        }
        else {
            user = nullableUser.get ();
            roleHolder = user.getRoleList ();
            thisUserIsStudent = false;
            for (i = 0; i < roleHolder.size (); i++){
                role = roleHolder.get (i);
                if (role.getRoleName ().equals ("ROLE_STUDENT")){
                    thisUserIsStudent = true;
                    break;
                }
            }
            if (thisUserIsStudent == false){
                throw new InvalidRequestArgumentException (
                        "This user is not a student." + System.lineSeparator ()
                        + "Parameter name: userID"
                );
            }
            else {
                nullableCourse = courseRepository.findById (courseID);
                if (nullableCourse.isPresent () == false){
                    throw new NotFoundException ("Course");
                }
                else {
                    course = nullableCourse.get ();
                    userList = course.getUserList ();
                    alreadyExistsInTheCourse = false;
                    for (i = 0; i < userList.size (); i++){
                        userInTheCourse = userList.get (i);
                        if (user.getUserID ().equals (
                                userInTheCourse.getUserID ()
                        )){
                            alreadyExistsInTheCourse = true;
                            break;
                        }
                    }
                    if (alreadyExistsInTheCourse == true){
                        throw new InvalidRequestArgumentException (
                                "This student has already existed "
                                + "in the course please add a student "
                                + "who is not in the course." 
                                + System.lineSeparator () 
                                + "Parameter name: userID, courseID"
                        );
                    }
                    else {
                        userList.add (user);
                    }
                }
            }
        }
    }
    
    /**
     * removeStudentFromCourse<br>
     * 
     * <pre>
     * Method will remove a student from one or many courses
     * </pre>
     * 
     * @param userID
     * @param courseID 
     */
    public void removeStudentFromCourse (int userID, int courseID){
        Optional<User> nullableUser;
        User user;
        List<Role> roleHolder;
        int i;
        Role role;
        boolean thisUserIsStudent;
        Optional <Course> nullableCourse;
        Course course;
        List<User> userList;
        User userInTheCourse;
        boolean existsInTheCourse;
        
        nullableUser = userRepository.findById (userID);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("Student");
        }
        else {
            user = nullableUser.get ();
            roleHolder = user.getRoleList ();
            thisUserIsStudent = false;
            for (i = 0; i < roleHolder.size (); i++){
                role = roleHolder.get (i);
                if (role.getRoleName ().equals ("ROLE_STUDENT")){
                    thisUserIsStudent = true;
                    break;
                }
            }
            if (thisUserIsStudent == false){
                throw new InvalidRequestArgumentException (
                        "This user is not a student." + System.lineSeparator ()
                        + "Parameter name: userID"
                );
            }
            else {
                nullableCourse = courseRepository.findById (courseID);
                if (nullableCourse.isPresent () == false){
                    throw new NotFoundException ("Course");
                }
                else {
                    course = nullableCourse.get ();
                    userList = course.getUserList ();
                    existsInTheCourse = false;
                    for (i = 0; i < userList.size (); i++){
                        userInTheCourse = userList.get (i);
                        if (user.getUserID ().equals (
                                userInTheCourse.getUserID ()
                        )){
                            existsInTheCourse = true;
                            break;
                        }
                    }
                    if (existsInTheCourse == false){
                        throw new InvalidRequestArgumentException (
                                "This student no longer exists "
                                + "in the course please remove a student "
                                + "who is still in the course." 
                                + System.lineSeparator () 
                                + "Parameter name: userID, courseID"
                        );
                    }
                    else {
                        userList.remove (user);
                    }
                }
            }
        }
    }
    
    /**
     * getAllCourse<br>
     * 
     * @return 
     */
    public List<Course> getAllCourse(){
        return courseRepository.findAll();
    }
    
    /**
     * getCourseById<br>
     * 
     * @param courseID
     * @return 
     */
    public Course getCourseById(Integer courseID) {     
        return courseRepository.findById(courseID).orElseThrow();
    }
    
    /**
     * getCourseByCurrentUserName<br>
     * 
     * @param userName
     * @return 
     */
    public List<Course> getCoursesByCurrentUserName(String userName) {
        User user = userRepository.findByUserName(userName).orElseThrow();
        return user.getCourseList();
    }
    
    /**
     * getCourseName<br>
     * 
     * @param courseName
     * @return 
     */
    public Course getCourseByName(String courseName) {
        return courseRepository.findByCourseName(courseName);
    }
}
