package com.campuscore.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    // Clever Cloud ഡാഷ്‌ബോർഡിൽ നിന്ന് കിട്ടിയ വിവരങ്ങൾ ഇവിടെ നൽകുക:
    private static final String HOST = "bqbjznvccymyvy8a0eu2-mysql.services.clever-cloud.com";
    private static final String PORT = "3306"; // Clever Cloud-ൽ കാണുന്ന Port നമ്പർ
    private static final String DB_NAME = "bqbjznvccymyvy8a0eu2";
    private static final String USER = "u2kkg7hxuuy33vyl";
    private static final String PASSWORD = "u2kkg7hxuuy33vyl";

    private static final String URL = "jdbc:mysql://" + HOST + ":" + PORT + "/" + DB_NAME + "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL Driver not found: " + e.getMessage());
        }
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}