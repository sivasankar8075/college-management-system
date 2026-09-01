package com.campuscore.dao;

import com.campuscore.config.DatabaseConnection;
import com.campuscore.models.Course;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CourseDAO {
    public List<Course> getAll() {
        List<Course> list = new ArrayList<>();
        String sql = "SELECT c.course_code, c.course_name, c.department, c.semester, c.credits, " +
                     "COALESCE(u.full_name, 'Unassigned') AS faculty_name, " +
                     "(SELECT COUNT(*) FROM course_enrollments ce WHERE ce.course_code = c.course_code) AS enrolled_students " +
                     "FROM courses c LEFT JOIN faculties f ON c.faculty_id = f.faculty_id LEFT JOIN users u ON f.user_id = u.user_id";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                list.add(new Course(
                    rs.getString("course_code"), rs.getString("course_name"), rs.getString("department"),
                    rs.getString("semester"), rs.getInt("credits"), rs.getString("faculty_name"),
                    rs.getInt("enrolled_students")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    public boolean save(Course c) {
        String sql = "INSERT INTO courses (course_code, course_name, department, semester, credits, faculty_id) " +
                     "VALUES (?, ?, ?, ?, ?, (SELECT faculty_id FROM users u JOIN faculties f ON u.user_id = f.user_id WHERE u.full_name = ? LIMIT 1)) " +
                     "ON DUPLICATE KEY UPDATE course_name = VALUES(course_name), department = VALUES(department), semester = VALUES(semester), credits = VALUES(credits), faculty_id = VALUES(faculty_id)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, c.getCode());
            stmt.setString(2, c.getName());
            stmt.setString(3, c.getDepartment());
            stmt.setString(4, c.getSemester());
            stmt.setInt(5, c.getCredits());
            stmt.setString(6, c.getFaculty());
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(String courseCode) {
        String sql = "DELETE FROM courses WHERE course_code = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, courseCode);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}