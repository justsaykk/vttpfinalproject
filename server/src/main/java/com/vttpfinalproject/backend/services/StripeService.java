package com.vttpfinalproject.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionRetrieveParams;
import com.vttpfinalproject.backend.models.CartItem;

@Service
public class StripeService {

    @Value("${spring.stripe.apikey}")
    private String stripeSecretKey;

    @Value("${spring.stripe.clienturl}")
    private String CLIENT_URL;

    @Autowired
    private TransactionRepoService tRepoService;

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    public final String endpointSecret = "whsec_322f0ce16457c639b48d0c90f498be0570724e8eccb546d0bb38b2c5881043b8";

    public Session createSession(CartItem[] cart) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        List<SessionCreateParams.LineItem> listOfLineItems = this.createLineItems(cart);
        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(CLIENT_URL + "/payment/success")
            .setCancelUrl(CLIENT_URL + "/payment/cancel")
            .addAllLineItem(listOfLineItems)
            .build();
        return Session.create(params);
    }

    public void stripeEventHandler(Event event) throws StripeException {
        EventDataObjectDeserializer edod = event.getDataObjectDeserializer();
        if ("checkout.session.completed".equals(event.getType())) {
            Session sesh = (Session)edod.getObject().get();
            SessionRetrieveParams params = SessionRetrieveParams.builder().addExpand("line_items").build();
            Session session = Session.retrieve(sesh.getId(), params, null);
            tRepoService.addTransaction(session);
        }
    }

    // Helper Methods
    private List<SessionCreateParams.LineItem> createLineItems(CartItem[] cart) throws StripeException {
        List<SessionCreateParams.LineItem> listOfLineItems = new LinkedList<>();
        for (CartItem cartItem : cart) {
            Long itemPrice = Long.valueOf(String.valueOf(cartItem.getDrink().getPrice() * 100));
            Long quantity = Long.valueOf(String.valueOf(cartItem.getQuantity()));
            
            System.out.printf("Drink: %s, Price: %d, quantity: %d \n", 
            cartItem.getDrink().getStrDrink(), itemPrice, quantity);
            
            String affix = UUID.randomUUID().toString().substring(0, 8);
            ProductCreateParams productParams = ProductCreateParams.builder()
                .setName(cartItem.getDrink().getStrDrink())
                .setId("%s_%s".formatted(cartItem.getDrink().getIdDrink(), affix))
                .addImage(cartItem.getDrink().getStrDrinkImage())
                .setActive(true)
                .build();
            Product product = Product.create(productParams);

            PriceCreateParams priceParams = PriceCreateParams.builder()
                .setProduct(product.getId())
                .setUnitAmount(itemPrice)
                .setCurrency("sgd")
                .build();
            Price price = Price.create(priceParams);

            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
            .setPrice(price.getId())
            .setQuantity(quantity)
            .build();
            listOfLineItems.add(lineItem);
        }
        return listOfLineItems;
    }
}
