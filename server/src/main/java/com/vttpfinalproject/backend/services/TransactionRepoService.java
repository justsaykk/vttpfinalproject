package com.vttpfinalproject.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.vttpfinalproject.backend.models.MySqlCheckoutSession;
import com.vttpfinalproject.backend.models.TransactionDetail;
import com.vttpfinalproject.backend.repository.TransactionDetailsRepo;
import com.vttpfinalproject.backend.repository.TransactionTable;

@Service
public class TransactionRepoService {

    @Autowired
    private TransactionTable transactionRepo;
    @Autowired
    private TransactionDetailsRepo detailsRepo;

    public void addTransaction(Session session) throws StripeException {
        transactionRepo.insertNewTransaction(new MySqlCheckoutSession(session));
        detailsRepo.insertNewTransaction(new TransactionDetail(session));
    }
}
