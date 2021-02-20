/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.controller.exception.AlreadyExistException;
import com.PhanLam.backend.controller.exception.InvalidRequestArgumentException;
import com.PhanLam.backend.dal.repository_interface.NewUserRepository;
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.NewUser;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.model.User;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.TypedSort;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false) 
public class NewUserService {
    
    // Variables declaration:
    private NewUserRepository newUserRepository;
    private Argon2PasswordEncoder passwordEncoder;
    private UserRepository userRepository; 

    public NewUserService (
            NewUserRepository newUserRepository
            , Argon2PasswordEncoder passwordEncoder
            , UserRepository userRepository
    ){
        this.newUserRepository = newUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void createNewUser (NewUser newUser){
        String userName;
        boolean newUserAlreadyExist;
        boolean userAlreadyExist;
        String password;
        
        userName = newUser.getUserName ();
        newUserAlreadyExist = newUserRepository.existsByUserName (userName);
        userAlreadyExist = userRepository.existsByUserName (userName);
        if ((newUserAlreadyExist == true) || (userAlreadyExist == true)){
            throw new AlreadyExistException ("user name");
        }
        else {
            password = newUser.getPassword ();
            password = passwordEncoder.encode (password);
            newUser.setPassword (password);
            newUserRepository.save (newUser);
        }
    }
    
    @Transactional (readOnly = true)
    public ArrayList<NewUser> getAllNewUser (int pageNumber, int pageSize){
        ArrayList<NewUser> newUserHolder;
        PageRequest pageRequestInformation;
        Page<NewUser> newUserPage;
        TypedSort<NewUser> newUserSortInformation;
        Sort sortInformation; 
        
        newUserSortInformation = Sort.sort (NewUser.class);
        sortInformation 
            = newUserSortInformation.by (NewUser::getFirstName).ascending ()
            .and (
                    newUserSortInformation.by (NewUser::getLastName)
                    .ascending ()
            );
        pageRequestInformation = PageRequest.of (
                pageNumber
                , pageSize
                , sortInformation
        );
        newUserPage = newUserRepository.findAll (pageRequestInformation);
        newUserHolder = new ArrayList<> (newUserPage.getContent ());
        return newUserHolder;
    }
    
    public void useNewUserToCreateUser (
            int userID
            , ArrayList<Role> newAccountRoleList
    ){
        Optional <NewUser> nullableNewUser;
        NewUser newUser;
        String userName;
        String firstName;
        String lastName;
        String phoneNumber;
        String password;
        String accountStatus;
        Date dateCreated;
        User user;
        
        if (newAccountRoleList.size () > 0){
            nullableNewUser = newUserRepository.findById (userID);
            if (nullableNewUser.isPresent () == false){
                throw new NotFoundException ("create-account-request");
            }
            else {
                newUser = nullableNewUser.get ();
                newUserRepository.delete (newUser);
                userName = newUser.getUserName ();
                firstName = newUser.getFirstName ();
                lastName = newUser.getLastName ();
                phoneNumber = newUser.getPhoneNumber ();
                password = newUser.getPassword ();
                accountStatus = "Active";
                dateCreated = new Date ();
                user = new User (
                        userName
                        , firstName
                        , lastName
                        , phoneNumber
                        , password
                        , accountStatus
                        , dateCreated
                );
                user.setRoleList (newAccountRoleList);
                userRepository.save (user);
            }
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The new account role list is empty"
                    + ", please send at least 1 role for the new account !"
            );
        }
    }
}
