/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.configuration;

// Import package members section:
import com.PhanLam.backend.controller.exception.ExceptionResponseBody;
import com.PhanLam.backend.controller.exception.UserAlreadyExistException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 *
 * @author Phan Lam
 */
@RestControllerAdvice (basePackages = "com.PhanLam.backend.controller")
public class ControllerAdvice {
    
    // Variables declaration:
    private ExceptionResponseBody responseBody; 
       
    @ExceptionHandler (UserAlreadyExistException.class)
    @ResponseStatus (HttpStatus.BAD_REQUEST)
    public ExceptionResponseBody handleUserAlreadyExistException (
            UserAlreadyExistException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        return responseBody;
    }
}
