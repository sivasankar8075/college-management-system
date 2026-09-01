package com.campuscore.services;

import com.campuscore.dao.FeeDAO;
import com.campuscore.models.Fee;
import java.util.List;

public class FeeService {
    private final FeeDAO dao = new FeeDAO();

    public List<Fee> getAllFees() { return dao.getAll(); }
    public boolean markPaid(String studentId) { return dao.markPaid(studentId); }
}