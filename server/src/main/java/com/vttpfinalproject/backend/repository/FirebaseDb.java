package com.vttpfinalproject.backend.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.vttpfinalproject.backend.models.TransactionDetail;
import com.vttpfinalproject.backend.models.User;

@Repository
public class FirebaseDb {

    @Autowired
    @Qualifier("firestore")
    private Firestore db;

    /* Transaction Collection Methods */
    public void insertNewTransaction(TransactionDetail tDetail) {
        DocumentReference reference = this.db.collection("transactions").document();
        reference.set(tDetail);
    }

    public List<TransactionDetail> getTransactionByEmail(String email) throws InterruptedException, ExecutionException {
        ApiFuture<QuerySnapshot> query = this.db.collection("transactions")
            .whereEqualTo("customer_email", email).get();
        QuerySnapshot snapshot = query.get();
        List<TransactionDetail> listOfTransactions = new ArrayList<>();
        List<QueryDocumentSnapshot> documents = snapshot.getDocuments();
        documents.forEach((doc) -> {
            listOfTransactions.add(doc.toObject(TransactionDetail.class));
        });
        return listOfTransactions;
    }

    /* Users collection Methods */
    public void createUser(User user) {
        DocumentReference reference = this.db.collection("users").document(user.getFirebaseUID());  
        reference.set(user);
    }

    public Optional<User> getUserByUID(String uid) throws InterruptedException, ExecutionException {
        ApiFuture<DocumentSnapshot> query = this.db.collection("users").document(uid).get();
        DocumentSnapshot document = query.get();
        if (document.exists()) {
            return Optional.of(document.toObject(User.class));
        }
        return Optional.empty();
    }
}
