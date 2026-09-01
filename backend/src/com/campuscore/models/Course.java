package com.campuscore.models;

public class Course {
    private String code;
    private String name;
    private String department;
    private String semester;
    private int credits;
    private String faculty;
    private int students;

    public Course() {}
    public Course(String code, String name, String department, String semester, int credits, String faculty, int students) {
        this.code = code;
        this.name = name;
        this.department = department;
        this.semester = semester;
        this.credits = credits;
        this.faculty = faculty;
        this.students = students;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public int getCredits() { return credits; }
    public void setCredits(int credits) { this.credits = credits; }
    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }
    public int getStudents() { return students; }
    public void setStudents(int students) { this.students = students; }
}