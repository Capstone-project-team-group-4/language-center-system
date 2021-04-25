/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:

import com.PhanLam.backend.model.RegisterForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

/**
 *
 * @author Phan Lam
 */
public interface RegisterFormRepository
        extends JpaRepository<RegisterForm, Integer> , JpaSpecificationExecutor<RegisterForm> {

    @Override
    public RegisterForm save (RegisterForm registerForm);

    public boolean existsByUserName (String userName);

    @Override
    public Optional<RegisterForm> findById (Integer formID);

    @Override
    public void delete (RegisterForm registerForm);

    Page<RegisterForm> findAll( Specification<RegisterForm> spec, Pageable pageable);
}
