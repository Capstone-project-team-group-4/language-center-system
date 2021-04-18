/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.configuration;

// Import package members section:
import com.PhanLam.backend.service.UserInformationGet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders
        .AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration
        .EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration
        .WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.web.authentication.logout
        .HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 *
 * @author Phan Lam
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    
    // Variables declaration:
    private UserInformationGet userInformationGetter;
    private SecurityResponseBuild securityResponseBuilder; 

    public SecurityConfiguration (
            UserInformationGet userInformationGetter
            , SecurityResponseBuild securityResponseBuilder
    ){
        this.userInformationGetter = userInformationGetter;
        this.securityResponseBuilder = securityResponseBuilder;
    }

    @Bean
    public Argon2PasswordEncoder getPasswordEncoderForEncoding (){
        Argon2PasswordEncoder passwordEncoder;
        
        passwordEncoder = new Argon2PasswordEncoder ();
        return passwordEncoder;
    }
    
    @Bean
    public DelegatingPasswordEncoder getPasswordEncoderForMatches (){
        DelegatingPasswordEncoder passwordEncoderForMatches;
        
        passwordEncoderForMatches 
                = (DelegatingPasswordEncoder) PasswordEncoderFactories
                        .createDelegatingPasswordEncoder ();
        passwordEncoderForMatches.setDefaultPasswordEncoderForMatches (
                getPasswordEncoderForEncoding ()
        );
        return passwordEncoderForMatches;
    }
    
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource (){
        CorsConfiguration corsConfiguration;
        UrlBasedCorsConfigurationSource source;
        
        corsConfiguration = new CorsConfiguration ();
        corsConfiguration.addAllowedOriginPattern ("http://localhost:3000");
        corsConfiguration.addAllowedOriginPattern ("http://localhost:3000/**");
        corsConfiguration.addAllowedMethod (CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader (CorsConfiguration.ALL);
        corsConfiguration.setAllowCredentials (true);
        source = new UrlBasedCorsConfigurationSource ();
        source.registerCorsConfiguration (
                "/**"
                , corsConfiguration
        );
        return source;
    }
    
    @Bean
    public HttpStatusReturningLogoutSuccessHandler getLogoutSuccessHandler (){
        HttpStatusReturningLogoutSuccessHandler logoutSuccessHandler;
        
        logoutSuccessHandler = new HttpStatusReturningLogoutSuccessHandler ();
        return logoutSuccessHandler;
    } 
    
    @Override
    protected void configure (
            AuthenticationManagerBuilder authenticationManagerBuilder
    ) throws Exception { 
        authenticationManagerBuilder
                .userDetailsService (userInformationGetter)
                .passwordEncoder (getPasswordEncoderForMatches ());
    }

    @Override
    protected void configure (HttpSecurity security) throws Exception {
        security.csrf ().disable ();
        security.cors ();
        security.formLogin ().disable ();
//        security.requiresChannel ().anyRequest ().requiresSecure ();
        security.httpBasic ().authenticationEntryPoint (
                securityResponseBuilder
        );
        security.logout ().logoutSuccessHandler (getLogoutSuccessHandler ());
        security.authorizeRequests ()
                .antMatchers (HttpMethod.GET, "/logged-in-user")
                        .authenticated ()
                
                .antMatchers (HttpMethod.GET, "/register-forms")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.POST, "/register-forms")
                        .permitAll ()
                .antMatchers (HttpMethod.PATCH, "/register-forms/*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.DELETE, "/register-forms/*")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.GET, "/users*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.PATCH, "/users/*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.DELETE, "/users/*")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.GET, "/getStudent/*")
                        .hasRole ("ADMIN")  
                .antMatchers (HttpMethod.PUT, "/editInfo/*")
                        .hasRole ("ADMIN")
                .antMatchers (
                        HttpMethod.GET
                        , "/students:excluding-student-in-the-course"
                )
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.POST, "/courses")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.GET, "/courses")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.PUT, "/courses/*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.PATCH, "/courses/*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.DELETE, "/courses/*")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.GET, "/courses/*/students")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.POST, "/courses/*/examinations")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.GET, "/courses/*/examinations")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.PUT, "/courses/*/examinations/*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.DELETE, "/courses/*/examinations/*")
                        .hasRole ("ADMIN")               
                .antMatchers (HttpMethod.GET, "/examinations")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.PATCH, "/examinations/*")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.GET, "/roles")
                        .authenticated ()
                
                .antMatchers (HttpMethod.GET, "/courses/*")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.GET, "/course-types")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.GET, "/course-types/*/course-levels")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.POST, "/quizzes")
                        .hasRole ("TEACHER")
                .antMatchers (HttpMethod.GET, "/quizzes*")
                        .hasAnyRole ("TEACHER", "ADMIN")
                .antMatchers (HttpMethod.PUT, "/quizzes/*")
                        .hasRole ("TEACHER")
                .antMatchers (HttpMethod.DELETE, "/quizzes/*")
                        .hasRole ("TEACHER")
                .antMatchers (HttpMethod.GET, "/examinations/*/quizzes")
                        .hasRole ("ADMIN")
                
                .antMatchers (HttpMethod.GET, "/courses/*")
                        .hasRole ("STUDENT")
                .antMatchers (HttpMethod.GET, "/getCourseByName*")
                        .hasRole ("STUDENT")
                .antMatchers (HttpMethod.GET, "/myCourses*")
                        .hasRole ("STUDENT")   
                .antMatchers (HttpMethod.GET, "/id*")
                        .hasRole ("STUDENT")
                .antMatchers (HttpMethod.GET, "/lesson*")
                        .hasRole ("STUDENT")
                .antMatchers (HttpMethod.GET, "/getProfile*")
                        .hasRole ("STUDENT")
                .anyRequest ().denyAll ();
    }
}
