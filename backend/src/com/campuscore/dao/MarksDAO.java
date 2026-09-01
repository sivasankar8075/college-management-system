package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.InternalMark;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MarksDAO {
    public List<InternalMark> getByCourse(String courseCode) {
        List<InternalMark> list = new ArrayList<>();
        String sql = "SELECT student_id, course_code, internal1, internal2, assignment FROM internal_marks WHERE course_code = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, courseCode);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    list.add(new InternalMark(
                        rs.getString("student_id"), rs.getString("course_code"),
                        rs.getDouble("internal1"), rs.getDouble("internal2"), rs.getDouble("assignment")
                    ));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean save(String studentId, String courseCode, String assessment, double mark) {
        String sql = "INSERT INTO internal_marks (student_id, course_code, " + assessment + ") VALUES (?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE " + assessment + " = VALUES(" + assessment + ")";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, studentId);
            stmt.setString(2, courseCode);
            stmt.setDouble(3, mark);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}