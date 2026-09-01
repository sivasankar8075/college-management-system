package com.campuscore.models;

public class Student {
    private String studentId;
    private String name;
    private String email;
    private String department;
    private String semester;
    private String phone;
    private double attendance;

    public Student() {}
    public Student(String studentId, String name, String email, String department, String semester, String phone, double attendance) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.semester = semester;
        this.phone = phone;
        this.attendance = attendance;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public double getAttendance() { return attendance; }
    public void setAttendance(double attendance) { this.attendance = attendance; }
}