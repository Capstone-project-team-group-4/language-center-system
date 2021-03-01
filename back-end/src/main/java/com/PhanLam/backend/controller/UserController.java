/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.User;
import com.PhanLam.backend.service.UserService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.security.Principal;
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

    public UserController(
            UserService userService,
             UserRepository userRepository
    ) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> listUsers() {
        List listUsers = new ArrayList<>();
        listUsers = userService.getAll();
        return listUsers;
    }

    @GetMapping("/users:excluding-logged-in-user")
    @ResponseStatus(HttpStatus.OK)
    public ArrayList<User> getAllUserExcludingCurrentLoggedInUser(
            Principal principal,
             @RequestParam int pageNumber,
             @RequestParam int pageSize
    ) {
        ArrayList<User> userHolder;

        userHolder = userService.getAllUserWithUserNameIsNot(
                principal,
                 pageNumber,
                 pageSize
        );
        return userHolder;
    }

    @PatchMapping("/users/{userID}:disable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disableAnotherUser(
            @PathVariable int userID,
             Principal principal
    ) {
        userService.disableUserByID(userID, principal);
    }

    @PatchMapping("/users/{userID}:enable")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void enableUser(
            @PathVariable int userID
    ) {
        userService.enableUserByID(userID);
    }

    @DeleteMapping("/users/{userID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAnotherUser(
            @PathVariable int userID,
             Principal principal
    ) {
        userService.deleteUserByID(userID, principal);
    }

    @PutMapping("/editInfo/{userID}")
    @ResponseStatus(HttpStatus.OK)
    public User updateStudentInfo(
            @RequestBody User user,
             @PathVariable int userID
    ) {
        return userService.updateStudent(user, userID);
    }

    @GetMapping("/getStudent/{userID}")
    public User getStudentById(@PathVariable int userID) {
        User user = userService.getById(userID);
        return user;
    }

    @GetMapping("/getUsers/{userID}")
    public Optional showAllUserByID(
            @RequestBody User user,
             @PathVariable int userID
    ) {
        Optional showUser = userService.showInfo(user, userID);
        return showUser;
    }
}
