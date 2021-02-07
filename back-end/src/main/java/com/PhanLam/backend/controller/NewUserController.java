/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.NewUser;
import com.PhanLam.backend.service.NewUserService;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@CrossOrigin (origins = "*")
@RestController
public class NewUserController {
    
    // Variables declaration:
    private NewUserService newUserService;

    public NewUserController (NewUserService newUserService){
        this.newUserService = newUserService;
    }
    
    @PostMapping ("/new-users")
    @ResponseStatus (HttpStatus.CREATED)
    @Transactional (propagation = Propagation.REQUIRES_NEW)
    public void registerNewUser (@Valid @RequestBody NewUser newUser){
        newUserService.createNewUser (newUser);
    }
}
