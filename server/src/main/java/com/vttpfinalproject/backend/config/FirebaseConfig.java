package com.vttpfinalproject.backend.config;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {


    private FirebaseOptions buildFireBaseOptions() throws IOException {
        // Build the FirebaseOptions object using the decoded JSON object
        return FirebaseOptions.builder()
        .setCredentials(GoogleCredentials.getApplicationDefault())
        .setProjectId("drink-factory-281e7")
        .setStorageBucket("drink-factory-281e7.appspot.com")
        .build();
    }

    public void InitializeFireBaseApp() throws IOException {
        FirebaseApp.initializeApp(this.buildFireBaseOptions());
    }

}
