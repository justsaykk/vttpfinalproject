package com.vttpfinalproject.backend.config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp InitializeFireBaseApp() throws IOException {
        FirebaseOptions fbOptions = FirebaseOptions.builder()
        // Credentials supplied via Environment Variables
        .setCredentials(GoogleCredentials.getApplicationDefault())
        .build();

        return FirebaseApp.initializeApp(fbOptions);
    }

}
