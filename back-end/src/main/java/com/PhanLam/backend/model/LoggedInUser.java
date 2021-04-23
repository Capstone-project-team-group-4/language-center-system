/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.List;
import java.util.Objects;

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

    @Override
    public int hashCode (){
        int hash = 3;
        hash = 71 * hash + Objects.hashCode (this.userName);
        hash = 71 * hash + Objects.hashCode (this.roleHolder);
        return hash;
    }

    @Override
    public boolean equals (Object obj){
        if (this == obj){
            return true;
        }
        if (obj == null){
            return false;
        }
        if (getClass () != obj.getClass ()){
            return false;
        }
        final LoggedInUser other = (LoggedInUser) obj;
        if (!Objects.equals (this.userName, other.userName)){
            return false;
        }
        if (!Objects.equals (this.roleHolder, other.roleHolder)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "LoggedInUser {" 
                + "userName=" + userName 
                + ", roleHolder=" + roleHolder 
        + '}';
    }
}
