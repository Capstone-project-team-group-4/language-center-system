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
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class CourseService {
    
    // Variables declaration:
    private CourseRepository courseRepository;
    private UserRepository userRepository;

    public CourseService (
            CourseRepository courseRepository
            , UserRepository userRepository
    ){
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
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
            throw new NotFoundException ("User ID");
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
                    throw new NotFoundException ("Course ID");
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
            throw new NotFoundException ("User ID");
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
                    throw new NotFoundException ("Course ID");
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
}
