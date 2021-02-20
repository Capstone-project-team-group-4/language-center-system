/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.NewUser;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.service.NewUserService;
import java.util.ArrayList;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class NewUserController {
    
    // Variables declaration:
    private NewUserService newUserService;

    public NewUserController (NewUserService newUserService){
        this.newUserService = newUserService;
    }
    
    @GetMapping ("/new-users")
    @ResponseStatus (HttpStatus.OK)
    public ArrayList<NewUser> getAllCreateAccountRequest (
            @RequestParam int pageNumber
            , @RequestParam int pageSize
    ){
        ArrayList<NewUser> newUserHolder;
        
        newUserHolder = newUserService.getAllNewUser (pageNumber, pageSize);
        return newUserHolder;
    } 
    
    @PostMapping ("/new-users")
    @ResponseStatus (HttpStatus.CREATED)
    public void registerNewCreateAccountRequest (
            @Valid @RequestBody NewUser newUser
    ){
        newUserService.createNewUser (newUser);
    }
    
    @PatchMapping ("/new-users/{userID}:accept")
    @ResponseStatus (HttpStatus.OK)
    public void acceptCreateAccountRequest (
            @PathVariable int userID
            , @RequestBody ArrayList<Role> newAccountRoleList
    ){
        newUserService.useNewUserToCreateUser (userID, newAccountRoleList);
    } 
}
