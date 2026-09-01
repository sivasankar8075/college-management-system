package com.campuscore.models;

public class Announcement {
    private int id;
    private String title;
    private String message;
    private String category;
    private String date;
    private String author;

    public Announcement() {}
    public Announcement(int id, String title, String message, String category, String date, String author) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.category = category;
        this.date = date;
        this.author = author;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
}