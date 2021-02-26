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
//@EnableWebSecurity
public class SecurityConfiguration {
    
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
    
//    @Override
    protected void configure (
            AuthenticationManagerBuilder authenticationManagerBuilder
    ) throws Exception { 
        authenticationManagerBuilder
                .userDetailsService (userInformationGetter)
                .passwordEncoder (getPasswordEncoderForMatches ());
    }

//    @Override
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
                .antMatchers (HttpMethod.GET, "/logged-in-user*/**")
                        .authenticated ()
                .antMatchers (HttpMethod.GET, "/new-users*/**")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.POST, "/new-users")
                        .permitAll ()
                .antMatchers (HttpMethod.PATCH, "/new-users*/**")
                        .hasRole ("ADMIN")
                .antMatchers (HttpMethod.GET, "/roles*/**")
                        .authenticated ()
                .anyRequest ().denyAll ();
    }
}
