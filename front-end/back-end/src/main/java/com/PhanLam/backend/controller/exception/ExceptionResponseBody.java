/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller.exception;

// Import package members section:
import org.springframework.core.NestedExceptionUtils;

/**
 *
 * @author Phan Lam
 */
public class ExceptionResponseBody {
    
    // Variables declaration:
    private String exceptionTitle;
    private String message; 

    public ExceptionResponseBody (Exception exception){
        Throwable exceptionOrRootCause;
        
        exceptionTitle = "";
        exceptionOrRootCause = NestedExceptionUtils.getMostSpecificCause (
                exception
        );
        message = exceptionOrRootCause.getLocalizedMessage ();
    }

    public String getExceptionTitle (){
        return exceptionTitle;
    }

    public void setExceptionTitle (String exceptionTitle){
        this.exceptionTitle = exceptionTitle;
    }
    
    public String getMessage (){
        return message;
    }
}
