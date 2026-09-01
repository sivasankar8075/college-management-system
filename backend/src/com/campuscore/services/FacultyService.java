package com.campuscore.services;

import com.campuscore.dao.FacultyDAO;
import com.campuscore.models.Faculty;
import java.util.List;

public class FacultyService {
    private final FacultyDAO dao = new FacultyDAO();

    public List<Faculty> getFaculties() { return dao.getAll(); }
    public boolean saveFaculty(Faculty f, String pwd) { return dao.save(f, pwd != null ? pwd : "defaultPassword123"); }
    public boolean removeFaculty(String id) { return dao.delete(id); }
}