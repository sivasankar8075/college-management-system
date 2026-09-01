package com.campuscore.api;

import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class HttpHandlers {
    public static void setCORS(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    public static String readBody(HttpExchange exchange) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
            return sb.toString();
        }
    }

    public static void sendJson(HttpExchange exchange, int statusCode, String jsonResponse) throws IOException {
        setCORS(exchange);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        byte[] bytes = jsonResponse.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    public static String getJsonValue(String json, String key) {
        String p = "\"" + key + "\":\"";
        int start = json.indexOf(p);
        if (start == -1) return "";
        start += p.length();
        int end = json.indexOf("\"", start);
        return end != -1 ? json.substring(start, end) : "";
    }
}