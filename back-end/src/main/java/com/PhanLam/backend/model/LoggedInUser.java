/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.util.ArrayList;

/**
 *
 * @author Phan Lam
 */
public class LoggedInUser {
    
    // Variables declaration:
    private String userName;
    private ArrayList<Role> roleHolder; 

    public LoggedInUser (){
    }

    public LoggedInUser (String userName, ArrayList<Role> roleHolder){
        this.userName = userName;
        this.roleHolder = roleHolder;
    }

    public String getUserName() {
        return userName;
    }

    public ArrayList<Role> getRoleHolder() {
        return roleHolder;
    }
}
