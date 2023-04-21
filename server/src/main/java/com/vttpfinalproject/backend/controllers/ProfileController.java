package com.vttpfinalproject.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.google.firebase.auth.FirebaseToken;
import com.vttpfinalproject.backend.models.User;
import com.vttpfinalproject.backend.services.AuthenticationService;
import com.vttpfinalproject.backend.services.TransactionRepoService;
import com.vttpfinalproject.backend.services.UserService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://vttpfinalproject.vercel.app"})
@RequestMapping(path = "/api/profile", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProfileController {
    
    @Autowired
    private AuthenticationService authSvc;
    @Autowired
    private TransactionRepoService tRxSvc;
    @Autowired
    private UserService userSvc;

    @GetMapping(path = "/transactions", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getTransactionsByEmail(
        @RequestHeader("Authorization") String tokenString
    ) {
        Optional<FirebaseToken> optFbToken = this.authSvc.verifyFirebaseToken(tokenString);
        if (optFbToken.isEmpty()) {
            return new ResponseEntity<String>("Invalid token", HttpStatus.FORBIDDEN);
        }

        JsonArrayBuilder ja = tRxSvc.getTransactionsByEmail(optFbToken.get().getEmail());
        return new ResponseEntity<String>(
            Json.createObjectBuilder().add("data", ja).build().toString(), 
            HttpStatus.OK);
    }

    @GetMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getProfile(
        @RequestHeader("Authorization") String tokenString
    ) {
        Optional<FirebaseToken> optFbToken = this.authSvc.verifyFirebaseToken(tokenString);
        if (optFbToken.isEmpty()) {
            return new ResponseEntity<String>("Invalid token", HttpStatus.FORBIDDEN);
        }

        FirebaseToken fbToken = optFbToken.get();
        Optional<User> dbUserOptional = userSvc.getUserByUID(fbToken.getUid());
        if (dbUserOptional.isEmpty()) {
            userSvc.createUser(new User(fbToken));
            dbUserOptional = userSvc.getUserByUID(fbToken.getUid());
        }
        return new ResponseEntity<String>(dbUserOptional.get().toJson().toString(), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createProfile(
        @RequestHeader("Authorization") String tokenString,
        @RequestBody User user
    ) { 
        Optional<FirebaseToken> optFbToken = this.authSvc.verifyFirebaseToken(tokenString);
        if (optFbToken.isEmpty()) {
            return new ResponseEntity<String>("Invalid token", HttpStatus.FORBIDDEN);
        }
        
        if (userSvc.createUser(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateProfile (
        @RequestBody User user,
        @RequestHeader("Authorization") String tokenString
    ) {
        Optional<FirebaseToken> optFbToken = this.authSvc.verifyFirebaseToken(tokenString);
        if (optFbToken.isEmpty()) {
            return new ResponseEntity<String>("Invalid token", HttpStatus.FORBIDDEN);
        }

        if (userSvc.updateUser(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteProfile (
        @RequestBody User user,
        @RequestHeader("Authorization") String tokenString
    ) {
        Optional<FirebaseToken> optFbToken = this.authSvc.verifyFirebaseToken(tokenString);
        if (optFbToken.isEmpty()) {
            return new ResponseEntity<String>("Invalid token", HttpStatus.FORBIDDEN);
        }

        if (userSvc.deleteUser(user)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
