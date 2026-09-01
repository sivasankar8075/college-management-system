package com.campuscore.models;

public class Fee {
    private String studentId;
    private String studentName;
    private String department;
    private double totalFee;
    private double paid;
    private String status;

    public Fee() {}
    public Fee(String studentId, String studentName, String department, double totalFee, double paid, String status) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.department = department;
        this.totalFee = totalFee;
        this.paid = paid;
        this.status = status;
    }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public double getTotalFee() { return totalFee; }
    public void setTotalFee(double totalFee) { this.totalFee = totalFee; }
    public double getPaid() { return paid; }
    public void setPaid(double paid) { this.paid = paid; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}