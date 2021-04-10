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
import com.PhanLam.backend.controller.exception.ForbiddenActionException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
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
        String exceptionTitle;
        
        exceptionTitle = exception.getExceptionTitle ();
        responseBody = new ExceptionResponseBody (exception);
        responseBody.setExceptionTitle (exceptionTitle);
        return responseBody;
    }
    
    @ExceptionHandler (NotFoundException.class)
    @ResponseStatus (HttpStatus.NOT_FOUND)
    public ExceptionResponseBody handleNotFoundException (
            NotFoundException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        responseBody.setExceptionTitle ("Not Found !");
        return responseBody;
    }
    
    @ExceptionHandler (InvalidRequestArgumentException.class)
    @ResponseStatus (HttpStatus.BAD_REQUEST)
    public ExceptionResponseBody handleInvalidRequestArgumentException (
            InvalidRequestArgumentException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        responseBody.setExceptionTitle ("Invalid Request Argument !");
        return responseBody;
    }
    
    @ExceptionHandler (BadCredentialsException.class)
    @ResponseStatus (HttpStatus.UNAUTHORIZED)
    public ExceptionResponseBody handleBadCredentialsException (
            BadCredentialsException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        responseBody.setExceptionTitle (
                "User Name Or Password Is Incorrect !"
        );
        return responseBody;
    }
    
    @ExceptionHandler (DisabledException.class)
    @ResponseStatus (HttpStatus.FORBIDDEN)
    public ExceptionResponseBody handleDisabledException (
            DisabledException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        responseBody.setExceptionTitle (
                "Your Account Has Been Blocked !"
        );
        return responseBody;
    }
    
    @ExceptionHandler (ForbiddenActionException.class)
    @ResponseStatus (HttpStatus.FORBIDDEN)
    public ExceptionResponseBody handleForbiddenActionException (
            ForbiddenActionException exception
    ){
        responseBody = new ExceptionResponseBody (exception);
        responseBody.setExceptionTitle ("Your Action Is Forbidden !");
        return responseBody;
    }
}
