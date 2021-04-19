/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.LoggedInUser;
import com.PhanLam.backend.model.User;
import java.security.Principal;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 *
 * @author Phan Lam
 */
@ExtendWith (MockitoExtension.class)
public class UserServiceTests {
    
    // Variables declaration:
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;
    @Mock
    Principal principal;
    
    @Test
    public void getLoggedInUserTest (){
        // Given
        String loggedInUserName = "Phan Lam";
        when (principal.getName ()).thenReturn (loggedInUserName);
        User user = new User ();
        user.setUserName (loggedInUserName);
        Optional<User> nullableUser = Optional.ofNullable (user);
        when (
                userRepository.findByUserName (loggedInUserName)
        ).thenReturn (nullableUser);
        LoggedInUser expectedOutput = new LoggedInUser (
                loggedInUserName
                , null
        );
        
        // When
        LoggedInUser output = userService.getLoggedInUser (principal);
        
        // Then
        Assertions
                .assertThat (output)
                .usingRecursiveComparison ()
                .withStrictTypeChecking ()
                .isEqualTo (expectedOutput);
    } 
}
