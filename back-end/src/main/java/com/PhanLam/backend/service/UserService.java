/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.service;

import com.PhanLam.backend.model.User;
import java.util.Optional;

/**
 *
 * @author roboc
 */
public interface UserService {
    public User updateStudent(User user, int UserID);
    public Optional showInfo(User user, int userID);
}
