/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.LoggedInUser;
import com.PhanLam.backend.model.User;
import com.PhanLam.backend.service.UserService;
import java.util.List;
import java.util.Optional;
import java.security.Principal;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
public class UserController {

    // Variables declaration:
    private UserService userService; 
    private UserRepository userRepository;

    public UserController (
            UserService userService
            , UserRepository userRepository
    ){
        this.userService = userService;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> listUsers() {
        List listUsers = new ArrayList<> ();
        listUsers = userService.getAll();
        return listUsers;
    }
    
    @GetMapping ("/users:excluding-logged-in-user")
    @ResponseStatus (HttpStatus.OK)
    public List<User> getAllUserExcludingCurrentLoggedInUser (
            Principal principal
            , @RequestParam int pageNumber
            , @RequestParam int pageSize
    ){
        List<User> userHolder;
        
        userHolder = userService.getAllUserWithUserNameIsNot (
                principal
                , pageNumber
                , pageSize
        );
        return userHolder;
    }
    
    @GetMapping ("/students:excluding-student-in-the-course")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<User> getAllStudentExcludingStudentInTheCourse (
            @RequestParam int courseID
            , @RequestParam int pageIndex
            , @RequestParam int pageSize
    ){
        DataPage<User> studentDataPage;
        
        studentDataPage = userService.getAllStudentWithCourseIDIsNot (
                courseID
                , pageIndex
                , pageSize
        );
        return studentDataPage;
    }
    
    @GetMapping ("/students:are-in-the-course")
    @ResponseStatus (HttpStatus.OK)
    public DataPage<User> getAllStudentAreInTheCourse (
            @RequestParam int courseID
            , @RequestParam int pageIndex
            , @RequestParam int pageSize
    ){
        DataPage<User> studentDataPage;
        
        studentDataPage = userService.getAllStudentByCourseID (
                courseID
                , pageIndex
                , pageSize
        );
        return studentDataPage;
    }
    
    @PatchMapping ("/users/{userID}:disable")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void disableAnotherUser (
            @PathVariable int userID
            , Principal principal
    ){
        userService.disableUserByID (userID, principal);
    }
    
    @PatchMapping ("/users/{userID}:enable")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void enableUser (
            @PathVariable int userID
    ){
        userService.enableUserByID (userID);
    }
    
    @DeleteMapping ("/users/{userID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void deleteAnotherUser (
            @PathVariable int userID
            , Principal principal
    ){
        userService.deleteUserByID (userID, principal);
    }
    
//    @GetMapping ("/logged-in-user")
//    @ResponseStatus (HttpStatus.OK)
//    public LoggedInUser getCurrentLoggedInUser (Principal principal){
//        LoggedInUser loggedInUser;
//        
//        loggedInUser = userService.getLoggedInUser (principal);
//        return loggedInUser;
//    }
//    
//    @PutMapping("/editInfo/{userID}")
//    @ResponseStatus(HttpStatus.OK)
//    public User updateStudentInfo(
//            @RequestBody User user
//            , @PathVariable int userID
//    ){
//        return userService.updateStudent(user, userID);
//    }

    @GetMapping("/getStudent/{userID}")
    @ResponseStatus(HttpStatus.OK)
    public User getStudentById(@PathVariable int userID) {
        User user = userService.getById(userID);
        return user;
    }
    
    @GetMapping("/getUsers/{userID}")
    public Optional showAllUserByID(
            @RequestBody User user
            , @PathVariable int userID
    ){
        Optional showUser = userService.showInfo(user, userID);
        return showUser;
    }
}
