package com.vttpfinalproject.backend.services;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttpfinalproject.backend.models.User;
import com.vttpfinalproject.backend.repository.FirebaseDb;
// import com.vttpfinalproject.backend.repository.UserTable;
// import org.springframework.jdbc.support.rowset.SqlRowSet;

@Service
public class UserService {

    // @Autowired
    // private UserTable userTable;

    @Autowired
    private FirebaseDb firebaseDb;

    // Deployed on Cloud Run
    public Optional<User> getUserByUID(String uid) throws InterruptedException, ExecutionException {
        return firebaseDb.getUserByUID(uid);
    }

    public void createUser(User user) {
        // This method serves both create and update user
        firebaseDb.createUser(user);
    }

    // Deployed on railway & using MySQL
    // public Optional<User> getUserByUID(String uid) {
    //     SqlRowSet rs = userTable.getUserByUID(uid);
    //     if (!rs.first())
    //         return Optional.empty();
    //     return Optional.of(new User(rs));
    // }

    // public boolean updateUser(User user) {
    //     return (userTable.updateUser(user) > 0);
    // }

    // public boolean createUser(User user) {
    //     return (userTable.createUser(user) > 0);
    // }

    // public boolean deleteUser(User user) {
    //     return (userTable.deleteUser(user) > 0);
    // }
}
