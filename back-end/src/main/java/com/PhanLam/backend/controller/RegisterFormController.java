/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.RegisterForm;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.service.RegisterFormService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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
public class RegisterFormController {
    
    // Variables declaration:
    private RegisterFormService registerFormService;

    public RegisterFormController (RegisterFormService registerFormService){
        this.registerFormService = registerFormService;
    }
    
    @GetMapping ("/register-forms")
    @ResponseStatus (HttpStatus.OK)
    public List<RegisterForm> getAllCreateAccountRequest (
            @RequestParam int pageNumber
            , @RequestParam int pageSize
    ){
        List<RegisterForm> registerFormHolder;
        
        registerFormHolder = registerFormService.getAllRegisterForm (
                pageNumber
                , pageSize
        );
        return registerFormHolder;
    } 
    
    @PostMapping ("/register-forms")
    @ResponseStatus (HttpStatus.CREATED)
    public void registerNewCreateAccountRequest (
            @Valid @RequestBody RegisterForm registerForm
    ){
        registerFormService.createRegisterForm (registerForm);
    }
    
    @PatchMapping ("/register-forms/{formID}:accept")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void acceptCreateAccountRequest (
            @PathVariable int formID
            , @RequestBody List<Role> newAccountRoleList
    ){
        registerFormService.useRegisterFormToCreateUser (
                formID
                , newAccountRoleList
        );
    } 
    
    @DeleteMapping ("/register-forms/{formID}")
    @ResponseStatus (HttpStatus.NO_CONTENT)
    public void rejectCreateAccountRequest (@PathVariable int formID){
        registerFormService.deleteRegisterFormByID (formID);
    }
}
