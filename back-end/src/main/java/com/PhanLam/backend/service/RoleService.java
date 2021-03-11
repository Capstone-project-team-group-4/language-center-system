/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

// Import package members section:
import com.PhanLam.backend.dal.repository_interface.RoleRepository;
import com.PhanLam.backend.model.Role;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Phan Lam
 */
@Service
@Transactional (propagation = Propagation.REQUIRES_NEW, readOnly = false) 
public class RoleService {
    
    // Variables declaration:
    private RoleRepository roleRepository;

    public RoleService (RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }
    
    @Transactional (readOnly = true)
    public ArrayList<Role> getAllRole (){
        ArrayList<Role> roleHolder;
        List<Role> roleList;
        
        roleList = roleRepository.findAll ();
        roleHolder = new ArrayList<> (roleList);
        return roleHolder;
    }
}
