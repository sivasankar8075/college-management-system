package com.campuscore.models;

public class InternalMark {
    private String studentId;
    private String courseCode;
    private double internal1;
    private double internal2;
    private double assignment;

    public InternalMark() {}
    public InternalMark(String studentId, String courseCode, double internal1, double internal2, double assignment) {
        this.studentId = studentId;
        this.courseCode = courseCode;
        this.internal1 = internal1;
        this.internal2 = internal2;
        this.assignment = assignment;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public double getInternal1() { return internal1; }
    public void setInternal1(double internal1) { this.internal1 = internal1; }
    public double getInternal2() { return internal2; }
    public void setInternal2(double internal2) { this.internal2 = internal2; }
    public double getAssignment() { return assignment; }
    public void setAssignment(double assignment) { this.assignment = assignment; }
}