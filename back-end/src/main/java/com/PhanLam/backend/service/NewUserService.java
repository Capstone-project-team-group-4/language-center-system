/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.UserAlreadyExistException;
import com.PhanLam.backend.dal.repository_interface.NewUserRepository;
import com.PhanLam.backend.model.NewUser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRED, readOnly = false) 
public class NewUserService {
    
    // Variables declaration:
    private NewUserRepository newUserRepository;
    private PasswordEncoder passwordEncoder;

    public NewUserService (
            NewUserRepository newUserRepository
            , PasswordEncoder passwordEncoder
    ){
        this.newUserRepository = newUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createNewUser (NewUser newUser){
        String userName;
        boolean userAlreadyExist;
        String password;
        
        userName = newUser.getUserName ();
        userAlreadyExist = newUserRepository.existsByUserName (userName);
        if (userAlreadyExist == true){
            throw new UserAlreadyExistException ();
        }
        else {
            password = newUser.getPassword ();
            password = passwordEncoder.encode (password);
            newUser.setPassword (password);
            newUserRepository.save (newUser);
        }
    }
}
