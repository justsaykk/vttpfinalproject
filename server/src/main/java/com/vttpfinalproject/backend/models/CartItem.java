package com.vttpfinalproject.backend.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class CartItem {
    private Drink drink;
    private int quantity;
}
