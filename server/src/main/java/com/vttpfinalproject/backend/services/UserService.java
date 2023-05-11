package com.vttpfinalproject.backend.services;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttpfinalproject.backend.models.User;
import com.vttpfinalproject.backend.repository.FirebaseDb;

@Service
public class UserService {

    @Autowired
    private FirebaseDb firebaseDb;

    // Deployed on Cloud Run
    public Optional<User> getUserByUID(String uid) throws InterruptedException, ExecutionException {
        return firebaseDb.getUserByUID(uid);
    }

    // This method serves both create and update user
    public void createUser(User user) {
        firebaseDb.createUser(user);
    }
}
