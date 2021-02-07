/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.configuration;

// Import package members section:
//import com.PhanLam.OnlineQuiz.service.UserInformationGet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders
        .AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration
        .WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 *
 * @author Phan Lam
 */
@Configuration
//@EnableWebSecurity
public class SecurityConfiguration {
    
    // Variables declaration:
    private PasswordEncoder passwordEncoder;
//    private UserInformationGet userInformationGetter;
    private DelegatingPasswordEncoder passwordEncoderForMatches;

//    public SecurityConfiguration (UserInformationGet userInformationGetter){
//        this.userInformationGetter = userInformationGetter;
//    }
    
    @Bean
    public PasswordEncoder getPasswordEncoderForEncoding (){
        passwordEncoder = new Argon2PasswordEncoder ();
        return passwordEncoder;
    }
    
//    @Bean
//    public PasswordEncoder getPasswordEncoderForMatches (){
//        passwordEncoderForMatches 
//                = (DelegatingPasswordEncoder) PasswordEncoderFactories
//                        .createDelegatingPasswordEncoder ();
//        passwordEncoderForMatches.setDefaultPasswordEncoderForMatches (
//                new BCryptPasswordEncoder ()
//        );
//        return passwordEncoderForMatches;
//    }
    
//    @Override
//    protected void configure (
//            AuthenticationManagerBuilder authenticationManagerBuilder
//    ) 
//            throws Exception { 
//        authenticationManagerBuilder
//                .userDetailsService (userInformationGetter)
//                .passwordEncoder (getPasswordEncoderForMatches ());
//    }

//    @Override
    protected void configure (HttpSecurity http) throws Exception {
        http.csrf ().disable ();
        http.formLogin ().disable ();
//        http.requiresChannel ().anyRequest ().requiresSecure ();
        http.httpBasic ();
        http.authorizeRequests ()
                .antMatchers (HttpMethod.GET, "/users/**").authenticated ()
                .antMatchers (HttpMethod.POST, "/users").permitAll ()
//                .antMatchers (HttpMethod.POST, "/quizzes").hasRole ("teacher")
                .antMatchers (HttpMethod.POST, "/quizzes").permitAll ()
                .anyRequest ().denyAll ();
    }
}
