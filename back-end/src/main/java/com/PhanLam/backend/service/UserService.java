/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.UserRepository;
import com.PhanLam.backend.model.User;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Phan Lam
 */
@Service
public class UserService {
    
    // Variables declaration:
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAll() {
        return userRepository.findAll();
    }
}
