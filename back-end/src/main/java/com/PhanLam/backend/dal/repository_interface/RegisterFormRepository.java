/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.RegisterForm;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface RegisterFormRepository 
        extends JpaRepository<RegisterForm, Integer> {
    
    @Override
    public RegisterForm save (RegisterForm registerForm); 
    
    public boolean existsByUserName (String userName);
    
    @Override
    public Page<RegisterForm> findAll (Pageable pagingInformation); 
    
    @Override
    public Optional<RegisterForm> findById (Integer formID);

    @Override
    public void delete (RegisterForm registerForm);
}
