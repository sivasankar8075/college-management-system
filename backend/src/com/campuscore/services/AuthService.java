package com.campuscore.services;

import com.campuscore.dao.UserDAO;
import com.campuscore.models.User;

public class AuthService {
    private final UserDAO userDAO = new UserDAO();

    public User login(String userId, String password, String role) {
        if (userId == null || password == null || role == null) return null;
        return userDAO.authenticate(userId.trim(), password.trim(), role.trim());
    }
}