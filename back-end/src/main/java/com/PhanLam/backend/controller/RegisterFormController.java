/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.DataPage;
import com.PhanLam.backend.model.RegisterForm;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.service.RegisterFormService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public DataPage<RegisterForm> getAllCreateAccountRequest (
            @RequestParam int pageIndex
            , @RequestParam int pageSize
            , @RequestParam String searchParam
    ){
        DataPage<RegisterForm> registerFormDataPage;

        registerFormDataPage = registerFormService.getAllRegisterForm (
                pageIndex
                , pageSize
                , searchParam
        );
        return registerFormDataPage;
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
