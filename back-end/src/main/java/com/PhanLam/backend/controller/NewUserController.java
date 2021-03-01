/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.service.NewUserService;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    public NewUserController(NewUserService newUserService) {
        this.newUserService = newUserService;
    }

    @PatchMapping("/new-users/{userID}:accept")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void acceptCreateAccountRequest(
            @PathVariable int userID,
             @RequestBody ArrayList<Role> newAccountRoleList
    ) {
        newUserService.useNewUserToCreateUser(userID, newAccountRoleList);
    }

    @DeleteMapping("/new-users/{userID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rejectCreateAccountRequest(@PathVariable int userID) {
        newUserService.deleteNewUserByID(userID);
    }
}
