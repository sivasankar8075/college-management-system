package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.Student;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
    public List<Student> getAll() {
        List<Student> list = new ArrayList<>();
        String sql = "SELECT s.student_id, u.full_name, u.email, s.department, s.semester, s.phone, s.overall_attendance " +
                     "FROM students s JOIN users u ON s.user_id = u.user_id";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new Student(
                    rs.getString("student_id"), rs.getString("full_name"), rs.getString("email"),
                    rs.getString("department"), rs.getString("semester"), rs.getString("phone"),
                    rs.getDouble("overall_attendance")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean save(Student s, String password) {
        String uSql = "INSERT INTO users (user_id, password_hash, full_name, email, role) VALUES (?, ?, ?, ?, 'student') " +
                      "ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), email = VALUES(email)";
        String sSql = "INSERT INTO students (student_id, user_id, department, semester, phone, overall_attendance) VALUES (?, ?, ?, ?, ?, ?) " +
                      "ON DUPLICATE KEY UPDATE department = VALUES(department), semester = VALUES(semester), phone = VALUES(phone)";
        try (Connection conn = DatabaseConnection.getConnection()) {
            conn.setAutoCommit(false);
            try (PreparedStatement uStmt = conn.prepareStatement(uSql);
                 PreparedStatement sStmt = conn.prepareStatement(sSql)) {
                uStmt.setString(1, s.getStudentId());
                uStmt.setString(2, password);
                uStmt.setString(3, s.getName());
                uStmt.setString(4, s.getEmail());
                uStmt.executeUpdate();

                sStmt.setString(1, s.getStudentId());
                sStmt.setString(2, s.getStudentId());
                sStmt.setString(3, s.getDepartment());
                sStmt.setString(4, s.getSemester());
                sStmt.setString(5, s.getPhone());
                sStmt.setDouble(6, s.getAttendance());
                sStmt.executeUpdate();

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

    public boolean delete(String studentId) {
        String sql = "DELETE FROM users WHERE user_id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, studentId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}