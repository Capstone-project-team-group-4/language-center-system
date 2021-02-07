/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller.exception;

/**
 *
 * @author Phan Lam
 */
public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException (){
        super (
                "This user name has already been used"
                + ", please enter another user name !!!"
        );
    } 
}
