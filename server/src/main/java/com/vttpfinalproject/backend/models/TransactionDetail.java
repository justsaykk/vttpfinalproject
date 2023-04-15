package com.vttpfinalproject.backend.models;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;

import com.stripe.exception.StripeException;
import com.stripe.model.LineItem;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.model.checkout.Session.CustomerDetails;
import com.stripe.param.checkout.SessionListLineItemsParams;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TransactionDetail {
    private String session_id;
    private String customer_email;
    private String customer_phone;
    private List<CartItem> cartItems;

    public TransactionDetail(Session session) throws StripeException {
        SessionListLineItemsParams params = SessionListLineItemsParams.builder().build();
        CustomerDetails customerDetails = session.getCustomerDetails();
        this.session_id = session.getId();
        this.customer_email = customerDetails.getEmail();
        this.customer_phone = customerDetails.getPhone();
        this.cartItems = this.toListCartItems(session.listLineItems(params).getData());
    }

    public TransactionDetail(Document doc) {
        this.session_id = doc.getString("session_id");
        this.customer_email = doc.getString("customer_email");
        this.customer_phone = doc.getString("customer_phone");
        List<CartItem> toSetList = new ArrayList<>();
        List<Document> listOfCartItemDocs = doc.getList("cartItems", Document.class);
        listOfCartItemDocs.stream().forEach((docCartItem) -> {
            CartItem cartItem = new CartItem();
            cartItem.setQuantity(docCartItem.getInteger("quantity"));
            cartItem.setDrink(new Drink(docCartItem.get("drink", Document.class)));
            toSetList.add(cartItem);
        });
        this.cartItems = toSetList;
    }
    
    private int longToInt(Long l) {
        return Integer.parseInt(Long.toString(l));
    }
    
    private List<CartItem> toListCartItems(List<LineItem> lineItems) {
        List<CartItem> lineToCartItems = new LinkedList<>();
        lineItems.stream()
        .forEach(
            (lineItem) -> {
                CartItem cartItem = new CartItem();
                Drink drink = new Drink();
                Price priceObj = lineItem.getPrice();
                String productId = priceObj.getProduct();
                try {
                    Product productObj = Product.retrieve(productId);
                    drink.setStrDrink(productObj.getName());
                    String drinkImage = productObj.getImages().get(0);
                    drink.setStrDrinkImage(drinkImage);
                    drink.setIdDrink(productObj.getId().substring(0, productObj.getId().length() - 9));
                } catch (StripeException e) {
                    e.printStackTrace();
                }
                // Data from Price
                drink.setPrice(this.longToInt(priceObj.getUnitAmount()));
                // Data from Line Item
                cartItem.setQuantity(this.longToInt(lineItem.getQuantity()));
                cartItem.setDrink(drink);
                lineToCartItems.add(cartItem);
            }
        );
        return lineToCartItems;
    }

    public JsonObject toJson() {
        JsonArrayBuilder jab = Json.createArrayBuilder();
        this.cartItems.stream().forEach((item) -> {
            jab.add(Json.createObjectBuilder()
            .add("drink", item.getDrink().toJOB())
            .add("quantity", item.getQuantity()));
        });

        return Json.createObjectBuilder()
        .add("customer_email", this.customer_email)
        .add("customer_phone", this.customer_phone)
        .add("session_id", this.session_id)
        .add("cart_items", jab)
        .build();
    }
}