package com.vttpfinalproject.backend.config;

import com.google.firebase.FirebaseApp;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseOptions;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp InitializeFireBaseApp() throws IOException {
        String firebaseConfig = System.getenv("FIREBASE_CONFIG");
        FirebaseOptions fbOptions = FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.fromStream(new ByteArrayInputStream(firebaseConfig.getBytes())))
        .build();
        return FirebaseApp.initializeApp(fbOptions);
    }

}
