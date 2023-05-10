package com.vttpfinalproject.backend.services;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.vttpfinalproject.backend.models.TransactionDetail;
import com.vttpfinalproject.backend.repository.FirebaseDb;
// import com.vttpfinalproject.backend.models.MySqlCheckoutSession;
// import com.vttpfinalproject.backend.repository.TransactionDetailsRepo;
// import com.vttpfinalproject.backend.repository.TransactionTable;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@Service
public class TransactionRepoService {

    // @Autowired
    // private TransactionTable transactionRepo;
    // @Autowired
    // private TransactionDetailsRepo detailsRepo;
    // @Autowired
    // private SmsService sms;
    @Autowired
    private FirebaseDb firebaseDb;

    public void addTransaction(Session session) throws StripeException {
        System.out.println("Adding to transaction DBs");
        TransactionDetail tDetail = new TransactionDetail(session);
        // transactionRepo.insertNewTransaction(new MySqlCheckoutSession(session));
        // detailsRepo.insertNewTransaction(tDetail);
        firebaseDb.insertNewTransaction(tDetail);
    }

    public JsonArrayBuilder getTransactionsByEmail(String email) throws InterruptedException, ExecutionException {
        // List<TransactionDetail> tDetailList = detailsRepo.getTransactionByEmail(email);
        List<TransactionDetail> tDetailList = firebaseDb.getTransactionByEmail(email);
        JsonArrayBuilder jab = Json.createArrayBuilder();
        tDetailList.stream().forEach((tDetail) -> {
            jab.add(tDetail.toJson());
        });
        return jab;
    }
}
