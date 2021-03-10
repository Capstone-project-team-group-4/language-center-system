/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.Role;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = true)
public class UserInformationGet implements UserDetailsService {
    
    // Variables declaration:
    private UserRepository userRepository;

    public UserInformationGet (UserRepository userRepository){
        this.userRepository = userRepository;
    }
    
    @Override
    public UserDetails loadUserByUsername (String userName) 
            throws UsernameNotFoundException {
        Optional <com.PhanLam.backend.model.User> nullableUser; 
        com.PhanLam.backend.model.User user;
        ArrayList <SimpleGrantedAuthority> grantedAuthorityHolder;
        User userInformationHolder;
        ArrayList<Role> roleHolder;
        int i;
        Role role; 
        SimpleGrantedAuthority grantedAuthority;
        String roleName;
        
        nullableUser = userRepository.findByUserName (userName);
        if (nullableUser.isPresent () == false){
            throw new UsernameNotFoundException (
                    "Could not find user with user name (ID) = " + userName
            );
        }
        else {
            user = nullableUser.get ();
            roleHolder = new ArrayList<> (user.getRoleList ());
            grantedAuthorityHolder = new ArrayList<> ();
            for (i = 0; i < roleHolder.size (); i++){
                role = roleHolder.get (i);
                roleName = role.getRoleName ();
                grantedAuthority = new SimpleGrantedAuthority (roleName);
                grantedAuthorityHolder.add (grantedAuthority);
            }
            userInformationHolder = new User (
                    userName
                    , user.getPassword ()
                    , grantedAuthorityHolder
            );
        }
        return userInformationHolder;
    }   
}
