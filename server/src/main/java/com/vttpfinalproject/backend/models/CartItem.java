package com.vttpfinalproject.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartItem {
    private Drink drink;
    private int quantity;
}
