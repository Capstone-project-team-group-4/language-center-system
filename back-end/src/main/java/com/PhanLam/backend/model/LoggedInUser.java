/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.List;

/**
 *
 * @author Phan Lam
 */
public class LoggedInUser {
    
    // Variables declaration:
    private String userName;
    private List<Role> roleHolder; 

    public LoggedInUser (){
    }

    public LoggedInUser (String userName, List<Role> roleHolder){
        this.userName = userName;
        this.roleHolder = roleHolder;
    }

    public String getUserName (){
        return userName;
    }

    public List<Role> getRoleHolder (){
        return roleHolder;
    }
}
