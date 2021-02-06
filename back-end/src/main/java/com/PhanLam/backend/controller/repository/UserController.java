/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller.repository;

import com.PhanLam.backend.dal.repository.UserRepository;
import com.PhanLam.backend.model.User;
import com.PhanLam.backend.service.UserService;
import java.security.Principal;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@CrossOrigin (origins = "*")
@RestController
public class UserController {
    
    @Autowired
    private UserService userService;
    // Variables declaration:
    @Autowired
    private final UserRepository userRepository;

    public UserController (UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @PostMapping ("/users")
    @ResponseStatus (HttpStatus.CREATED)
    @Transactional (propagation = Propagation.REQUIRES_NEW)
    public void registerUser (@RequestBody User user){
        int userID;
        boolean userAlreadyExist;
        
        userID = user.getUserID ();
        userAlreadyExist = userRepository.existsById (userID);
        if (userAlreadyExist == true){
            return;
        }
        else {
            userRepository.save (user);
        }
    }
    
    @DeleteMapping ("/users/{userID}")
    @ResponseStatus (HttpStatus.OK)
    @Transactional (propagation = Propagation.REQUIRES_NEW)
    public void deleteUser (@PathVariable int userID){
        boolean userAlreadyExist;
        
        userAlreadyExist = userRepository.existsById (userID);
        if (userAlreadyExist == true){
            userRepository.deleteById (userID);
        }
        else {
            return;  
        }
    }
    
    @PutMapping("/editInfo/{userID}")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public User updateStudentInfo (@RequestBody User user, @PathVariable int userID){
        User updatedUser = userService.updateStudent(user, userID);
        return updatedUser;
    }
    
//    @GetMapping ("/users")
//    @ResponseStatus (HttpStatus.CREATED)
//    @Transactional (propagation = Propagation.REQUIRES_NEW)
//    public void getAllUser (@RequestBody User user){
//        int userID = user.getUserID ();
//        String firstName = user.getFirstName();
//        String lastName = user.getLastName();
//        String email = user.getEmail();
//        Date dbo = user.getDob();
//        String phoneNumber = user.getPhoneNumber();
//        String gender = user.getGender();
//        String job = user.getJob();
//        String photoURI = user.getPhotoURI();
//        String selfDescription = user.getSelfDescription();
//        String password = user.getPassword();
//        String accountStatus = user.getAccountStatus();
//        Date dateCreated = user.getDateCreated();
//        Date lastLogin = user.getLastLogin();
//        List <Role> roleList = user.getRoleList();
//        List<Address> addressList = user.getAddressList();
//        userRepository.findAll();
//    }
//    @GetMapping ("/users/{userID}")
//    public User findAllUserByID (@PathVariable String userID, Principal principal){
//        Optional <User> unnullableUser; 
//        User user;
//        boolean isPrincipalMatched;
//        
//        isPrincipalMatched = userID.equals (principal.getName());
//        if (isPrincipalMatched == false){
//            throw new UnauthorizedAccessException (userID);
//        }
//        unnullableUser = userRepository.findById (userID);
//        user = unnullableUser.get ();
//        user.setPassword ("");
//        return user;
//    }
        @GetMapping("/getUsers/{userID}")
    public Optional showAllUserByID(@RequestBody User user, @PathVariable int userID) {
        Optional showUser = userService.showInfo(user, userID);
        return showUser;
    }
    
}
