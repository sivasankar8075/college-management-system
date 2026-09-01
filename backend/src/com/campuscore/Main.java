package com.campuscore;

import com.campuscore.api.ApiServer;
import com.campuscore.config.DatabaseConnection;
import java.sql.Connection;

public class Main {
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("       Starting CampusCore CMS Backend...        ");
        System.out.println("=================================================");

        try {
            Connection conn = DatabaseConnection.getConnection();
            if (conn != null && !conn.isClosed()) {
                System.out.println("✓ MySQL Database connected successfully.");
                conn.close();
            }
            ApiServer.startServer();
        } catch (Exception e) {
            System.err.println("❌ Failed to start server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}