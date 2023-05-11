package com.vttpfinalproject.backend.config;

import com.google.firebase.FirebaseApp;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

    @Bean("firestore")
    public Firestore initializeFireBaseApp() throws IOException {
        String firebaseConfig = System.getenv("FIREBASE_CONFIG");
        FirebaseOptions fbOptions = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(new ByteArrayInputStream(firebaseConfig.getBytes())))
        .build();
        FirebaseApp firebaseApp = FirebaseApp.initializeApp(fbOptions);
        return FirestoreClient.getFirestore(firebaseApp);
    }
}
