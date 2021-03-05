/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller;

// Import package members section:
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.service.RoleService;
import java.util.ArrayList;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Phan Lam
 */
@RestController
public class RoleController {
    
    // Variables declaration:
    private RoleService roleService; 

    public RoleController (RoleService roleService){
        this.roleService = roleService;
    }
    
    @GetMapping ("/roles")
    @ResponseStatus (HttpStatus.OK)
    public ArrayList<Role> getAllRoleInTheSystem (){
        ArrayList<Role> roleHolder;
        
        roleHolder = roleService.getAllRole ();
        return roleHolder;
    }
}
