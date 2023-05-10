// package com.vttpfinalproject.backend.repository;

// import java.util.ArrayList;
// import java.util.List;

// import org.bson.Document;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoTemplate;
// import org.springframework.data.mongodb.core.aggregation.Aggregation;
// import org.springframework.data.mongodb.core.aggregation.AggregationResults;
// import org.springframework.data.mongodb.core.aggregation.MatchOperation;
// import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
// import org.springframework.data.mongodb.core.query.Criteria;
// import org.springframework.stereotype.Repository;

// import com.vttpfinalproject.backend.models.TransactionDetail;

// @Repository
// public class TransactionDetailsRepo {
    
//     @Autowired
//     private MongoTemplate repo;

//     public void insertNewTransaction(TransactionDetail tDetail) {
//         repo.insert(tDetail, "transactions");
//         System.out.println("Inserting new MongoDB Transaction");
//     }

//     public List<TransactionDetail> getTransactionByEmail(String email) {
//         Criteria criteria = Criteria.where("customer_email").is(email);
//         MatchOperation matchOps = Aggregation.match(criteria);
//         ProjectionOperation projectOps = Aggregation
//         .project("session_id", "customer_email", "customer_phone", "cartItems")
//         .andExclude("_id");

//         Aggregation pipeline = Aggregation.newAggregation(matchOps, projectOps);
//         AggregationResults<Document> results = repo.aggregate(pipeline, "transactions", Document.class);
//         List<TransactionDetail> listOfTransactions = new ArrayList<>();
//         results.forEach((doc) -> {
//             listOfTransactions.add(new TransactionDetail(doc));
//         });

//         return listOfTransactions;
//     }
// }
