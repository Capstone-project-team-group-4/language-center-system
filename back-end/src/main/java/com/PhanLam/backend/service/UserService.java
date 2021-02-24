/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.LoggedInUser;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.model.User;
import java.util.List;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author roboc
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false)
public class UserService {
    
    // Variables declaration:
    private UserRepository userRepository; 

    public UserService (UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @Transactional (readOnly = true)
    public LoggedInUser getLoggedInUser (Principal principal){
        LoggedInUser loggedInUser;
        String userName;
        Optional<User> nullableUser;
        User user;
        ArrayList<Role> roleHolder;

        userName = principal.getName ();
        nullableUser = userRepository.findByUserName (userName);
        if (nullableUser.isPresent () == false){
            throw new NotFoundException ("user");
        }
        else {
            user = nullableUser.get ();
            roleHolder = new ArrayList<> (user.getRoleList ());
        }
        loggedInUser = new LoggedInUser (userName, roleHolder);
        return loggedInUser;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }
    
    public User updateStudent(User user, int userID) {
        User updatedUser = new User();
        updatedUser.setUserID(userID);
        updatedUser.setUserName(user.getUserName());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setDob(user.getDob());
        updatedUser.setPhoneNumber(user.getPhoneNumber());
        updatedUser.setGender(user.getGender());
        updatedUser.setJob(user.getJob());
        updatedUser.setPhotoURI(user.getPhotoURI());
        updatedUser.setSelfDescription(user.getSelfDescription());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setAccountStatus(user.getAccountStatus());
        return userRepository.save(updatedUser);
    }
    
    public User getById(int userID){
        return userRepository.findById(userID).orElseThrow();
    }
    
    public Optional<User> showInfo(User user, int userID) {
        User showUser = new User();
        showUser.getUserID();
        showUser.getUserName();
        showUser.getFirstName();
        showUser.getLastName();
        showUser.getEmail();
        showUser.getDob();
        showUser.getPhoneNumber();
        showUser.getGender();
        showUser.getJob();
        showUser.getPhotoURI();
        showUser.getSelfDescription();
        showUser.getPassword();
        showUser.getAccountStatus();
        return userRepository.findById(userID);
    }
}
