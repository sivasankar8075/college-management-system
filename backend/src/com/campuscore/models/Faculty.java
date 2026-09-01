package com.campuscore.models;

public class Faculty {
    private String facultyId;
    private String name;
    private String email;
    private String department;
    private String designation;
    private String phone;
    private int courses;

    public Faculty() {}
    public Faculty(String facultyId, String name, String email, String department, String designation, String phone, int courses) {
        this.facultyId = facultyId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.designation = designation;
        this.phone = phone;
        this.courses = courses;
    }

    public String getFacultyId() { return facultyId; }
    public void setFacultyId(String facultyId) { this.facultyId = facultyId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public int getCourses() { return courses; }
    public void setCourses(int courses) { this.courses = courses; }
}