package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.Faculty;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FacultyDAO {
    public List<Faculty> getAll() {
        List<Faculty> list = new ArrayList<>();
        String sql = "SELECT f.faculty_id, u.full_name, u.email, f.department, f.designation, f.phone, " +
                     "(SELECT COUNT(*) FROM courses c WHERE c.faculty_id = f.faculty_id) AS course_count " +
                     "FROM faculties f JOIN users u ON f.user_id = u.user_id";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new Faculty(
                    rs.getString("faculty_id"), rs.getString("full_name"), rs.getString("email"),
                    rs.getString("department"), rs.getString("designation"), rs.getString("phone"),
                    rs.getInt("course_count")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean save(Faculty f, String password) {
        String uSql = "INSERT INTO users (user_id, password_hash, full_name, email, role) VALUES (?, ?, ?, ?, 'faculty') " +
                      "ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), email = VALUES(email)";
        String fSql = "INSERT INTO faculties (faculty_id, user_id, department, designation, phone) VALUES (?, ?, ?, ?, ?) " +
                      "ON DUPLICATE KEY UPDATE department = VALUES(department), designation = VALUES(designation), phone = VALUES(phone)";
        try (Connection conn = DatabaseConnection.getConnection()) {
            conn.setAutoCommit(false);
            try (PreparedStatement uStmt = conn.prepareStatement(uSql);
                 PreparedStatement fStmt = conn.prepareStatement(fSql)) {
                uStmt.setString(1, f.getFacultyId());
                uStmt.setString(2, password);
                uStmt.setString(3, f.getName());
                uStmt.setString(4, f.getEmail());
                uStmt.executeUpdate();

                fStmt.setString(1, f.getFacultyId());
                fStmt.setString(2, f.getFacultyId());
                fStmt.setString(3, f.getDepartment());
                fStmt.setString(4, f.getDesignation());
                fStmt.setString(5, f.getPhone());
                fStmt.executeUpdate();

                conn.commit();
                return true;
            } catch (SQLException ex) {
                conn.rollback();
                throw ex;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(String facultyId) {
        String sql = "DELETE FROM users WHERE user_id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, facultyId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}