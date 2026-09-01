package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class AttendanceDAO {
    public Map<String, String> getAttendance(String courseCode, String date) {
        Map<String, String> map = new HashMap<>();
        String sql = "SELECT student_id, status FROM attendance WHERE course_code = ? AND attendance_date = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, courseCode);
            stmt.setString(2, date);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    map.put(rs.getString("student_id"), rs.getString("status"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return map;
    }

    public boolean save(String studentId, String courseCode, String date, String status) {
        String sql = "INSERT INTO attendance (student_id, course_code, attendance_date, status) VALUES (?, ?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE status = VALUES(status)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, studentId);
            stmt.setString(2, courseCode);
            stmt.setString(3, date);
            stmt.setString(4, status);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}