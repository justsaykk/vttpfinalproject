package com.vttpfinalproject.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

@Service
public class AuthenticationService {
    
    public Optional<FirebaseToken> verifyFirebaseToken(String tokenString) {
        try {
            FirebaseToken authToken = FirebaseAuth.getInstance()
                .verifyIdToken(tokenString.replace("Bearer ", ""));
            return Optional.of(authToken);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
