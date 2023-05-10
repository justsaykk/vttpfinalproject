package com.vttpfinalproject.backend.models;

import java.util.Random;

// import org.bson.Document;

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
        Random random = new Random();
        // random.nextInt(maxPrice - minPrice + 1) + minPrice
        this.price = random.nextInt(11) + 5;
    }

    // public Drink(Document doc) {
    //     this.idDrink = doc.getString("idDrink");
    //     this.strDrink = doc.getString("strDrink");
    //     this.strDrinkImage = doc.getString("strDrinkImage");
    //     this.strDrinkThumb = this.strDrinkImage + "/preview";
    //     this.price = doc.getInteger("price");
    // }

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
