package com.vttpfinalproject.backend.models;

import java.util.LinkedList;
import java.util.List;

import com.stripe.exception.StripeException;
import com.stripe.model.LineItem;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.model.checkout.Session.CustomerDetails;
import com.stripe.param.checkout.SessionListLineItemsParams;

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
                    drink.setStrDrinkImage(productObj.getImages().get(0));
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
}
