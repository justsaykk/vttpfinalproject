package com.vttpfinalproject.backend.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import com.google.firebase.auth.FirebaseToken;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class User {
    private String name;
    private String email;
    private String profilePic;
    private String firebaseUID;

    public User(SqlRowSet rs) {
        this.name = rs.getString("name");
        this.email = rs.getString("email");
        this.profilePic = rs.getString("profilePic");
        this.firebaseUID = rs.getString("firebaseUID");
    }

    public User(FirebaseToken fbToken) {
        this.name = null != fbToken.getName() ? fbToken.getName() : fbToken.getEmail().split("@")[0];
        this.email = fbToken.getEmail();
        this.profilePic = null != fbToken.getPicture() ? fbToken.getPicture() : "assets/stock-profile-photo.jpeg";
        this.firebaseUID = fbToken.getUid();
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
        .add("name", this.name)
        .add("email", this.email)
        .add("profilePic",this.profilePic)
        .add("firebaseUID", this.firebaseUID)
        .build();
    }
}
