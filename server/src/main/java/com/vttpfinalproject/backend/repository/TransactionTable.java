package com.vttpfinalproject.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.vttpfinalproject.backend.models.MySqlCheckoutSession;
import static com.vttpfinalproject.backend.repository.SqlQueries.*;

@Repository
public class TransactionTable {

    @Autowired
    private JdbcTemplate repo;
    
    public void insertNewTransaction(MySqlCheckoutSession mySqlCheckoutSession) {
            repo.update(SQL_INSERT_TRANSACTION, mySqlCheckoutSession.getSession_id(), mySqlCheckoutSession.getAmount_total());
    }
}
