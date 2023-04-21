package com.vttpfinalproject.backend.repository;

public class SqlQueries {
//     public static final String SQL_GET_TRANSACTION_BY_ID = "SELECT * FROM transactions";
    public static final String SQL_INSERT_TRANSACTION = """
            INSERT INTO transactions (session_id, amount_total) 
            VALUES (?, ?)
            """;
    public static final String SQL_GET_USERS_BY_EMAIL = "SELECT * FROM users WHERE email = ?";
    public static final String SQL_GET_USERS_BY_UID = "SELECT * FROM users WHERE firebaseUID = ?";
    public static final String SQL_CREATE_USER = """
            INSERT INTO users (email, name, profilePic, firebaseUID)
            VALUES (?, ?, ?, ?)
            """;
    public static final String SQL_UPDATE_USER = """
            UPDATE users
            SET name = ?, profilePic = ?
            WHERE firebaseUID = ?
            """;
    public static final String SQL_DELETE_USER = "DELETE FROM users WHERE firebaseUID = ?";
}
