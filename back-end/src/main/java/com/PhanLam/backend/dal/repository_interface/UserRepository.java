/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.dal.repository_interface;

// Import package members section:
import com.PhanLam.backend.controller.exception.NotFoundException;
import com.PhanLam.backend.model.Role;
import com.PhanLam.backend.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Phan Lam
 */
@Repository
public interface UserRepository extends JpaRepository <User, Integer> {

    @Override
    public User save (User user); 

    @Override
    public Optional<User> findById (Integer userID);
    
    @Query("select u from User u where u.userID = ?1")
    public User findUserById(Integer userID);
    
    @Query("select u from User u where u.userName = ?1 and u.userName = ?2")
    public User findUserByIdAndUsername(Integer userID, String userName);
//    .findUserById(14);
    
    @Override
    public List<User> findAll();
    
    public boolean existsByUserName (String userName);
    
    public Optional<User> findByUserName (String userName);
    
    public List<User> findAllByUserNameIsNot (
            String userName
            , Pageable pagingInformation
    ); 
    
    @Override
    public void delete (User user);
}
