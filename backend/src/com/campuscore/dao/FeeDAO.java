package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.Fee;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FeeDAO {
    public List<Fee> getAll() {
        List<Fee> list = new ArrayList<>();
        String sql = "SELECT f.student_id, u.full_name, s.department, f.total_fee, f.paid_amount, f.status " +
                     "FROM fees f JOIN students s ON f.student_id = s.student_id JOIN users u ON s.user_id = u.user_id";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new Fee(
                    rs.getString("student_id"), rs.getString("full_name"), rs.getString("department"),
                    rs.getDouble("total_fee"), rs.getDouble("paid_amount"), rs.getString("status")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean markPaid(String studentId) {
        String sql = "UPDATE fees SET paid_amount = total_fee, status = 'Paid' WHERE student_id = ?";
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