package com.vttpfinalproject.backend.models;

import java.util.Random;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class Drink {
    private String idDrink;
    private String strDrink;
    private String strDrinkThumb;
    private String strDrinkImage;
    private int price;
    private int maxPrice = 15;
    private int minPrice = 5;

    
    public Drink(JsonObject jo) {
        this.idDrink = jo.getString("idDrink");
        this.strDrink = jo.getString("strDrink");
        this.strDrinkImage = jo.getString("strDrinkThumb");
        this.strDrinkThumb = this.strDrinkImage + "/preview";
        Random random = new Random();
        this.price = random.nextInt(maxPrice - minPrice + 1) + minPrice;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
        .add("idDrink", this.idDrink)
        .add("strDrink", this.strDrink)
        .add("strDrinkThumb", this.strDrinkThumb)
        .add("strDrinkImage", this.strDrinkImage)
        .add("price", this.price)
        .build();
    }
}
