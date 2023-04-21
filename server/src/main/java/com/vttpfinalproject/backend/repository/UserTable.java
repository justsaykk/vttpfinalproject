package com.vttpfinalproject.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.vttpfinalproject.backend.models.User;

import static com.vttpfinalproject.backend.repository.SqlQueries.*;

@Repository
public class UserTable {
    @Autowired
    private JdbcTemplate repo;


    public SqlRowSet getUserByEmail(String email) {
        return repo.queryForRowSet(SQL_GET_USERS_BY_EMAIL, email);
    }

    public SqlRowSet getUserByUID(String firebaseUID) {
        return repo.queryForRowSet(SQL_GET_TRANSACTION_BY_ID, firebaseUID);
    }

    public int createUser(User user) {
        return repo.update(SQL_CREATE_USER, 
        user.getEmail(), 
        user.getName(), 
        user.getProfilePic(), 
        user.getFirebaseUID());
    }

    public int updateUser(User user) {
        return repo.update(SQL_UPDATE_USER, 
            user.getName(), 
            user.getProfilePic(), 
            user.getFirebaseUID());
    }

    public int deleteUser(User user) {
        return repo.update(SQL_DELETE_USER, user.getFirebaseUID());
    }
}
