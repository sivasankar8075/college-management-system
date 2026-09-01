package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.Announcement;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AnnouncementDAO {
    public List<Announcement> getAll() {
        List<Announcement> list = new ArrayList<>();
        String sql = "SELECT a.announcement_id, a.title, a.message, a.category, a.published_date, u.full_name AS author " +
                     "FROM announcements a JOIN users u ON a.author_id = u.user_id ORDER BY a.published_date DESC";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new Announcement(
                    rs.getInt("announcement_id"), rs.getString("title"), rs.getString("message"),
                    rs.getString("category"), rs.getString("published_date"), rs.getString("author")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean save(Announcement a, String authorId) {
        String sql = "INSERT INTO announcements (title, message, category, published_date, author_id) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, a.getTitle());
            stmt.setString(2, a.getMessage());
            stmt.setString(3, a.getCategory());
            stmt.setString(4, a.getDate());
            stmt.setString(5, authorId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM announcements WHERE announcement_id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}