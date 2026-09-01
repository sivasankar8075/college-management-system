package com.campuscore.services;

import com.campuscore.dao.AttendanceDAO;
import com.campuscore.dao.CourseDAO;
import com.campuscore.dao.MarksDAO;
import com.campuscore.models.Course;
import com.campuscore.models.InternalMark;

import java.util.List;
import java.util.Map;

public class AcademicService {
    private final CourseDAO courseDAO = new CourseDAO();
    private final AttendanceDAO attendanceDAO = new AttendanceDAO();
    private final MarksDAO marksDAO = new MarksDAO();

    public List<Course> getCourses() { return courseDAO.getAll(); }
    public boolean saveCourse(Course c) { return courseDAO.save(c); }
    public boolean deleteCourse(String code) { return courseDAO.delete(code); }

    public Map<String, String> getAttendance(String code, String date) { return attendanceDAO.getAttendance(code, date); }
    public boolean recordAttendance(String studentId, String code, String date, String status) {
        return attendanceDAO.save(studentId, code, date, status);
    }

    public List<InternalMark> getMarks(String code) { return marksDAO.getByCourse(code); }
    public boolean recordMark(String studentId, String code, String assessment, double mark) {
        return marksDAO.save(studentId, code, assessment, mark);
    }
}