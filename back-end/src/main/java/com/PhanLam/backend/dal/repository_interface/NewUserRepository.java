/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.model.NewUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Phan Lam
 */
public interface NewUserRepository extends JpaRepository<NewUser, Integer> {
    
    @Override
    public NewUser save (NewUser newUser); 
    
    public boolean existsByUserName (String userName);
    
    @Override
    public Page <NewUser> findAll (Pageable pagingInformation); 
}
