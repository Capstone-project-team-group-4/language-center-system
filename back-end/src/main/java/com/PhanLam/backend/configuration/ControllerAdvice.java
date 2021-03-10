/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.configuration;

// Import package members section:
import com.PhanLam.backend.controller.exception.ExceptionResponseBody;
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 *
 * @author Phan Lam
 */
@RestControllerAdvice
public class ControllerAdvice {
    
    // Variables declaration:
    private ExceptionResponseBody responseBody; 
       
    @ExceptionHandler (AlreadyExistException.class)
    @ResponseStatus (HttpStatus.BAD_REQUEST)
    public ExceptionResponseBody handleAlreadyExistException (
            AlreadyExistException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        return responseBody;
    }
    
    @ExceptionHandler (NotFoundException.class)
    @ResponseStatus (HttpStatus.NOT_FOUND)
    public ExceptionResponseBody handleNotFoundException (
            NotFoundException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        return responseBody;
    }
    
    @ExceptionHandler (InvalidRequestArgumentException.class)
    @ResponseStatus (HttpStatus.BAD_REQUEST)
    public ExceptionResponseBody handleInvalidRequestArgumentException (
            InvalidRequestArgumentException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        return responseBody;
    }
    
    @ExceptionHandler (BadCredentialsException.class)
    @ResponseStatus (HttpStatus.UNAUTHORIZED)
    public ExceptionResponseBody handleBadCredentialsException (
            BadCredentialsException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        return responseBody;
    }
}
