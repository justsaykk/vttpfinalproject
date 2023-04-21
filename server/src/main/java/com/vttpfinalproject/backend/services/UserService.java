package com.vttpfinalproject.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.vttpfinalproject.backend.models.User;
import com.vttpfinalproject.backend.repository.UserTable;

@Service
public class UserService {

    @Autowired
    private UserTable userTable;

    public Optional<User> getUserByEmail(String email) {
        SqlRowSet rs = userTable.getUserByEmail(email);
        if (!rs.first())
            return Optional.empty();
        return Optional.of(new User(rs));
    }

    public Optional<User> getUserByUID(String uid) {
        SqlRowSet rs = userTable.getUserByEmail(uid);
        if (!rs.first())
            return Optional.empty();
        return Optional.of(new User(rs));
    }

    public boolean updateUser(User user) {
        return (userTable.updateUser(user) > 0);
    }

    public boolean createUser(User user) {
        return (userTable.createUser(user) > 0);
    }

    public boolean deleteUser(User user) {
        return (userTable.deleteUser(user) > 0);
    }
}
