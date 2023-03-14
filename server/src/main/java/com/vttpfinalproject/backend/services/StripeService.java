package com.vttpfinalproject.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static spark.Spark.post;
// import static spark.Spark.port;
// import static spark.Spark.staticFiles;

import java.util.LinkedList;
import java.util.List;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.vttpfinalproject.backend.models.CartItem;

@Service
public class StripeService {

    @Value("${spring.stripe.apikey}")
    private String stripeSecretKey;

    public void toStripePayments(CartItem[] cart) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        final String DOMAIN = "http://localhost:4200";
        List<SessionCreateParams.LineItem> listOfLineItems = this.createLineItems(cart);

        post("/create-checkout-session", (request, response) -> {
            SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(DOMAIN + "/success")
                .setCancelUrl(DOMAIN + "/cancel")
                .addAllLineItem(listOfLineItems)
                .setExpiresAt((long)60*30) // Expires after 30 mins
                .build();        
          Session session = Session.create(params);
    
          response.redirect(session.getUrl(), 303);
          return "";
        });
    }


    private List<SessionCreateParams.LineItem> createLineItems(CartItem[] cart) throws StripeException {
        List<SessionCreateParams.LineItem> listOfLineItems = new LinkedList<>();
        for (CartItem cartItem : cart) {
            ProductCreateParams productParams = ProductCreateParams.builder()
                .setName(cartItem.getDrink().getStrDrink())
                .setId(cartItem.getDrink().getIdDrink())
                .addImage(cartItem.getDrink().getStrDrinkImage())
                .setActive(true)
                .build();
            Product product = Product.create(productParams);

            PriceCreateParams priceParams = PriceCreateParams.builder()
                .setProduct(product.getId())
                .setUnitAmount((long)cartItem.getDrink().getPrice())
                .setCurrency("sgd")
                .build();
            Price price = Price.create(priceParams);

            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
            .setPrice(price.getId())
            .setQuantity((long)cartItem.getQuantity())
            .build();
            listOfLineItems.add(lineItem);
        }

        return listOfLineItems;
    }
}
