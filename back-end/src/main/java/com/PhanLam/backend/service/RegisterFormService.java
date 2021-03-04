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
import com.PhanLam.backend.dal.repository_interface.UserRepository;
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
import com.PhanLam.backend.dal.repository_interface.RegisterFormRepository;
import com.PhanLam.backend.model.RegisterForm;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false) 
public class RegisterFormService {
    
    // Variables declaration:
    private RegisterFormRepository registerFormRepository;
    private Argon2PasswordEncoder passwordEncoder;
    private UserRepository userRepository; 

    public RegisterFormService (
            RegisterFormRepository registerFormRepository
            , Argon2PasswordEncoder passwordEncoder
            , UserRepository userRepository
    ){
        this.registerFormRepository = registerFormRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void createRegisterForm (RegisterForm registerForm){
        String userName;
        boolean registerFormAlreadyExist;
        boolean userAlreadyExist;
        String password;
        
        userName = registerForm.getUserName ();
        registerFormAlreadyExist = registerFormRepository.existsByUserName (
                userName
        );
        userAlreadyExist = userRepository.existsByUserName (userName);
        if ((registerFormAlreadyExist == true) || (userAlreadyExist == true)){
            throw new AlreadyExistException ("User Name");
        }
        else {
            password = registerForm.getPassword ();
            password = passwordEncoder.encode (password);
            registerForm.setPassword (password);
            registerFormRepository.save (registerForm);
        }
    }
    
    @Transactional (readOnly = true)
    public ArrayList<RegisterForm> getAllRegisterForm (
            int pageNumber
            , int pageSize
    ){
        ArrayList<RegisterForm> RegisterFormHolder;
        PageRequest pagingInformation;
        Page<RegisterForm> RegisterFormPage;
        TypedSort<RegisterForm> RegisterFormSortInformation;
        Sort sortInformation; 
        
        if ((pageNumber >= 0) && (pageSize >= 0)){
            RegisterFormSortInformation = Sort.sort (RegisterForm.class);
            sortInformation 
                = RegisterFormSortInformation
                    .by (RegisterForm::getFirstName).ascending ()
                    .and (RegisterFormSortInformation
                        .by (RegisterForm::getLastName).ascending ()
                    );
            pagingInformation = PageRequest.of (
                    pageNumber
                    , pageSize
                    , sortInformation
            );
            RegisterFormPage = registerFormRepository.findAll (
                    pagingInformation
            );
            RegisterFormHolder = new ArrayList<> (
                    RegisterFormPage.getContent ()
            );
            return RegisterFormHolder;
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The page number and page size number parameters "
                    + "cannot be less than zero." + System.lineSeparator () 
                    + "Parameter name: pageNumber, pageSize"
            );
        }
    }
    
    public void useRegisterFormToCreateUser (
            int formID
            , ArrayList<Role> newAccountRoleList
    ){
        Optional <RegisterForm> nullableRegisterForm;
        RegisterForm registerForm;
        String userName;
        String firstName;
        String middleName;
        String lastName;
        String phoneNumber;
        String email;
        String password;
        Date dateCreated;
        User user;
        
        if (newAccountRoleList.size () > 0){
            nullableRegisterForm = registerFormRepository.findById (formID);
            if (nullableRegisterForm.isPresent () == false){
                throw new NotFoundException ("create-account-request");
            }
            else {
                registerForm = nullableRegisterForm.get ();
                registerFormRepository.delete (registerForm);
                userName = registerForm.getUserName ();
                firstName = registerForm.getFirstName ();
                middleName = registerForm.getMiddleName ();
                lastName = registerForm.getLastName ();
                phoneNumber = registerForm.getPhoneNumber ();
                email = registerForm.getEmail ();
                password = registerForm.getPassword ();
                dateCreated = new Date ();
                user = new User (
                        userName
                        , firstName
                        , middleName
                        , lastName
                        , phoneNumber
                        , email
                        , password
                        , dateCreated
                );
                user.setRoleList (newAccountRoleList);
                userRepository.save (user);
            }
        }
        else {
            throw new InvalidRequestArgumentException (
                    "The new account role list is empty"
                    + ", please send at least 1 role for the new account."
            );
        }
    }
    
    public void deleteRegisterFormByID (int formID){
        Optional<RegisterForm> nullableRegisterForm;
        RegisterForm registerForm;
        
        nullableRegisterForm = registerFormRepository.findById (formID);
        if (nullableRegisterForm.isPresent () == false){
            throw new NotFoundException ("User ID");
        }
        else {
            registerForm = nullableRegisterForm.get ();
            registerFormRepository.delete (registerForm);
        }
    }
}
