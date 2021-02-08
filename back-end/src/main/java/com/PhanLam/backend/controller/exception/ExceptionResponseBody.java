/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.controller.exception;

// Import package members section:
import java.util.Optional;
import org.springframework.core.NestedExceptionUtils;

/**
 *
 * @author Phan Lam
 */
public class ExceptionResponseBody {
    
    // Variables declaration:
    private String exceptionName;
    private String message; 

    public ExceptionResponseBody (Exception exception){
        Class exceptionClass;
        Optional <Throwable> nullableRootCause;
        Throwable rootCause;
        
        exceptionClass = exception.getClass (); 
        this.exceptionName = exceptionClass.getSimpleName ();
        nullableRootCause = Optional.ofNullable (
                NestedExceptionUtils.getRootCause (exception)
        );
        if (nullableRootCause.isPresent () == false){
            message = exception.getLocalizedMessage ();
        }
        else {
            rootCause = nullableRootCause.get ();
            message = rootCause.getLocalizedMessage ();
        }
    }

    public String getExceptionName (){
        return exceptionName;
    }

    public String getMessage (){
        return message;
    }
}
