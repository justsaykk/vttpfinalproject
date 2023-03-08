package com.vttpfinalproject.backend.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.Data;

@Data
public class Drink {
    private String idDrink;
    private String strDrink;
    private String strDrinkThumb;
    private String strDrinkImage;

    
    public Drink(JsonObject jo) {
        this.idDrink = jo.getString("idDrink");
        this.strDrink = jo.getString("strDrink");
        this.strDrinkImage = jo.getString("strDrinkThumb");
        this.strDrinkThumb = this.strDrinkImage + "/preview";
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
        .add("idDrink", this.idDrink)
        .add("strDrink", this.strDrink)
        .add("strDrinkThumb", this.strDrinkThumb)
        .add("strDrinkImage", this.strDrinkImage)
        .build();
    }
}
