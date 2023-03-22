package com.vttpfinalproject.backend.models;

import com.stripe.model.checkout.Session;

import lombok.Data;

@Data
public class MySqlCheckoutSession {
    private String session_id; // Checkout Session Id to be used with session.retrieve(id)
    private int amount_total;

    public MySqlCheckoutSession(Session session) {
        this.session_id = session.getId();
        this.amount_total = Integer.parseInt(Long.toString(session.getAmountTotal()));
    }
}
