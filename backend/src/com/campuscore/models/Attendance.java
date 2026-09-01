package com.campuscore.models;

public class Attendance {
    private int attendanceId;
    private String studentId;
    private String courseCode;
    private String date;
    private String status;

    public Attendance() {}
    public Attendance(String studentId, String courseCode, String date, String status) {
        this.studentId = studentId;
        this.courseCode = courseCode;
        this.date = date;
        this.status = status;
    }

    public int getAttendanceId() { return attendanceId; }
    public void setAttendanceId(int attendanceId) { this.attendanceId = attendanceId; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}