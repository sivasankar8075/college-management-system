package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.User;
import java.sql.*;

public class UserDAO {
    public User authenticate(String userId, String password, String role) {
        String sql = "SELECT user_id, full_name, email, role, password_hash FROM users WHERE user_id = ? AND role = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, userId);
            stmt.setString(2, role);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next() && rs.getString("password_hash").equals(password)) {
                    return new User(rs.getString("user_id"), null, rs.getString("full_name"), rs.getString("email"), rs.getString("role"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}