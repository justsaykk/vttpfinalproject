package com.vttpfinalproject.backend.repository;

public class SqlQueries {
    public static final String SQL_GET_TRANSACTION_BY_ID = "SELECT * FROM transactions";
    public static final String SQL_INSERT_TRANSACTION = """
            INSERT INTO transactions (session_id, amount_total) 
            VALUES (?, ?)
            """;
}
