/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.configuration;

// Import package members section:
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www
        .BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

/**
 *
 * @author Phan Lam
 */
@Component
public class SecurityResponseBuild extends BasicAuthenticationEntryPoint {
    
    // Variables declaration:
    private HandlerExceptionResolver exceptionResolver;
    
    public SecurityResponseBuild (
            @Qualifier (
                    "handlerExceptionResolver"
            ) HandlerExceptionResolver exceptionResolver
    ){
        this.exceptionResolver = exceptionResolver;
    }
    
    @Override
    public void afterPropertiesSet (){
        setRealmName ("Language Center System");
        super.afterPropertiesSet (); 
    }
 
    @Override
    public void commence (
            HttpServletRequest request
            , HttpServletResponse response
            , AuthenticationException authException
    ) throws IOException{
        exceptionResolver.resolveException (
                request
                , response
                , null
                , authException
        );
    }
}
