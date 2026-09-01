package com.campuscore.api;

import com.campuscore.dao.AnnouncementDAO;
import com.campuscore.models.*;
import com.campuscore.services.*;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.List;

public class ApiServer {
    private static final int PORT = 8080;

    public static void startServer() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        AuthService authService = new AuthService();
        StudentService studentService = new StudentService();
        FacultyService facultyService = new FacultyService();
        AcademicService academicService = new AcademicService();
        FeeService feeService = new FeeService();
        AnnouncementDAO announcementDAO = new AnnouncementDAO();

        // 1. Auth Endpoint
        server.createContext("/api/login", exchange -> {
            HttpHandlers.setCORS(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { exchange.sendResponseHeaders(204, -1); return; }
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                String body = HttpHandlers.readBody(exchange);
                User u = authService.login(HttpHandlers.getJsonValue(body, "userId"), HttpHandlers.getJsonValue(body, "password"), HttpHandlers.getJsonValue(body, "role"));
                if (u != null) {
                    HttpHandlers.sendJson(exchange, 200, String.format("{\"success\":true,\"userId\":\"%s\",\"name\":\"%s\",\"role\":\"%s\",\"email\":\"%s\"}",
                            u.getUserId(), u.getFullName(), u.getRole(), u.getEmail()));
                } else {
                    HttpHandlers.sendJson(exchange, 401, "{\"success\":false,\"message\":\"Invalid credentials\"}");
                }
            }
        });

        // 2. Students Endpoint
        server.createContext("/api/students", exchange -> {
            HttpHandlers.setCORS(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { exchange.sendResponseHeaders(204, -1); return; }
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Student> list = studentService.getStudents();
                StringBuilder json = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    Student s = list.get(i);
                    json.append(String.format("{\"id\":\"%s\",\"name\":\"%s\",\"email\":\"%s\",\"department\":\"%s\",\"semester\":\"%s\",\"phone\":\"%s\",\"attendance\":%s}",
                            s.getStudentId(), s.getName(), s.getEmail(), s.getDepartment(), s.getSemester(), s.getPhone(), s.getAttendance()));
                    if (i < list.size() - 1) json.append(",");
                }
                json.append("]");
                HttpHandlers.sendJson(exchange, 200, json.toString());
            }
        });

        // 3. Faculty Endpoint
        server.createContext("/api/faculty", exchange -> {
            HttpHandlers.setCORS(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { exchange.sendResponseHeaders(204, -1); return; }
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Faculty> list = facultyService.getFaculties();
                StringBuilder json = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    Faculty f = list.get(i);
                    json.append(String.format("{\"id\":\"%s\",\"name\":\"%s\",\"email\":\"%s\",\"department\":\"%s\",\"designation\":\"%s\",\"phone\":\"%s\",\"courses\":%d}",
                            f.getFacultyId(), f.getName(), f.getEmail(), f.getDepartment(), f.getDesignation(), f.getPhone(), f.getCourses()));
                    if (i < list.size() - 1) json.append(",");
                }
                json.append("]");
                HttpHandlers.sendJson(exchange, 200, json.toString());
            }
        });

        // 4. Courses Endpoint
        server.createContext("/api/courses", exchange -> {
            HttpHandlers.setCORS(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { exchange.sendResponseHeaders(204, -1); return; }
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Course> list = academicService.getCourses();
                StringBuilder json = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    Course c = list.get(i);
                    json.append(String.format("{\"code\":\"%s\",\"name\":\"%s\",\"department\":\"%s\",\"semester\":\"%s\",\"credits\":%d,\"faculty\":\"%s\",\"students\":%d}",
                            c.getCode(), c.getName(), c.getDepartment(), c.getSemester(), c.getCredits(), c.getFaculty(), c.getStudents()));
                    if (i < list.size() - 1) json.append(",");
                }
                json.append("]");
                HttpHandlers.sendJson(exchange, 200, json.toString());
            }
        });

        // 5. Fees Endpoint
        server.createContext("/api/fees", exchange -> {
            HttpHandlers.setCORS(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { exchange.sendResponseHeaders(204, -1); return; }
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Fee> list = feeService.getAllFees();
                StringBuilder json = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    Fee f = list.get(i);
                    json.append(String.format("{\"studentId\":\"%s\",\"studentName\":\"%s\",\"department\":\"%s\",\"totalFee\":%s,\"paid\":%s,\"status\":\"%s\"}",
                            f.getStudentId(), f.getStudentName(), f.getDepartment(), f.getTotalFee(), f.getPaid(), f.getStatus()));
                    if (i < list.size() - 1) json.append(",");
                }
                json.append("]");
                HttpHandlers.sendJson(exchange, 200, json.toString());
            }
        });

        // 6. Announcements Endpoint
        server.createContext("/api/announcements", exchange -> {
            HttpHandlers.setCORS(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) { exchange.sendResponseHeaders(204, -1); return; }
            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                List<Announcement> list = announcementDAO.getAll();
                StringBuilder json = new StringBuilder("[");
                for (int i = 0; i < list.size(); i++) {
                    Announcement a = list.get(i);
                    json.append(String.format("{\"id\":%d,\"title\":\"%s\",\"message\":\"%s\",\"category\":\"%s\",\"date\":\"%s\",\"author\":\"%s\"}",
                            a.getId(), a.getTitle(), a.getMessage(), a.getCategory(), a.getDate(), a.getAuthor()));
                    if (i < list.size() - 1) json.append(",");
                }
                json.append("]");
                HttpHandlers.sendJson(exchange, 200, json.toString());
            }
        });

        server.setExecutor(null);
        System.out.println("✓ CampusCore REST API Server running on port " + PORT);
        server.start();
    }
}