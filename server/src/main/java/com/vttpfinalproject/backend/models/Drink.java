package com.vttpfinalproject.backend.models;

import java.util.Random;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class Drink {
    private String idDrink;
    private String strDrink;
    private String strDrinkThumb;
    private String strDrinkImage;
    private int price;

    
    public Drink(JsonObject jo) {
        this.idDrink = jo.getString("idDrink");
        this.strDrink = jo.getString("strDrink");
        this.strDrinkImage = jo.getString("strDrinkThumb");
        this.strDrinkThumb = this.strDrinkImage + "/preview";
        this.price = new Random().nextInt(11) + 5;
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

    public JsonObjectBuilder toJOB() {
        return Json.createObjectBuilder()
        .add("idDrink", this.idDrink)
        .add("strDrink", this.strDrink)
        .add("strDrinkThumb", this.strDrinkThumb)
        .add("strDrinkImage", this.strDrinkImage)
        .add("price", this.price);
    }
}
