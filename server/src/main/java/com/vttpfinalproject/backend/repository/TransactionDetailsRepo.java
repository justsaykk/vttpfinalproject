package com.vttpfinalproject.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.vttpfinalproject.backend.models.TransactionDetail;

@Repository
public class TransactionDetailsRepo {
    
    @Autowired
    private MongoTemplate repo;

    public void insertNewTransaction(TransactionDetail tDetail) {
        repo.insert(tDetail, "transactions");
    }
}
