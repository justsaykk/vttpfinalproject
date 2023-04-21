package com.vttpfinalproject.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import com.vttpfinalproject.backend.models.CartItem;
import com.vttpfinalproject.backend.services.StripeService;

import jakarta.json.Json;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://vttpfinalproject.vercel.app"})
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class PaymentController {

    @Autowired
    private StripeService stripeSvc;
    @Value("${spring.stripe.endpointsecret}")
    private String stripeSecret;

    @PostMapping(path = "/create-checkout-session", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> processPayment(
        @RequestBody CartItem[] cartItems) throws StripeException {
            Session session = stripeSvc.createSession(cartItems);

            return new ResponseEntity<String>(
            Json.createObjectBuilder().add("redirectUrl", session.getUrl()).build().toString()    
            , HttpStatus.OK);
    }

    @PostMapping(path = "/checkoutsuccess")
    public ResponseEntity<String> stripeListener(
        @RequestBody String payload,
        @RequestHeader(name = "Stripe-Signature") String stripeSignature
    ) throws StripeException {
        Event event = null;

        try {
            // Checking if the Event JSON object conforms to the Event.class. If it doesn't => something wrong
            event = ApiResource.GSON.fromJson(payload, Event.class);
        } catch (JsonSyntaxException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(this.stripeSecret != null && stripeSignature != null) {
            try {
                event = Webhook.constructEvent(payload, stripeSignature, this.stripeSecret);
            } catch (SignatureVerificationException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        this.stripeSvc.stripeEventHandler(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
