package com.campuscore.services;

import com.campuscore.dao.StudentDAO;
import com.campuscore.models.Student;
import java.util.List;

public class StudentService {
    private final StudentDAO dao = new StudentDAO();

    public List<Student> getStudents() { return dao.getAll(); }
    public boolean saveStudent(Student s, String pwd) { return dao.save(s, pwd != null ? pwd : "defaultPassword123"); }
    public boolean removeStudent(String id) { return dao.delete(id); }
}