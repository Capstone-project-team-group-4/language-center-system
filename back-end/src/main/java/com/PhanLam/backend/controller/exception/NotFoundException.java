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
public class NotFoundException extends RuntimeException {

    public NotFoundException (String missingObjectName){
        super ("This " + missingObjectName + " is not found !!!");
    }
}
