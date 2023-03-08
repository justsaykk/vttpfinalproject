package com.vttpfinalproject.backend.models;

import java.util.HashMap;
import java.util.Map;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonValue;
import lombok.Getter;

@Getter
public class DetailedDrink extends Drink {
    private String strInstructions;
    private Map<String, String> ingredients;

    public DetailedDrink(JsonObject jo) {
        super(jo);
        Map<String, String> map = new HashMap<>();
        for (int i = 1; i < 16; i++) {
            String strKey = "strIngredient" + Integer.toString(i);
            String strValue = "strMeasure" + Integer.toString(i);
            JsonValue key = jo.get(strKey);
            JsonValue value = jo.get(strValue);
            if (value.toString().equals("null")) {
                break;
            }
            map.put(key.toString().replaceAll("\"", ""),
            value.toString().replaceAll("\"", ""));
        }
        this.ingredients = map;
        this.strInstructions = (jo.getString("strInstructions"));
    }

    public JsonObject toJson() {
        JsonObjectBuilder job = Json.createObjectBuilder();
        this.ingredients.forEach(
            (k, v) -> {
                job.add(k, v);
            }
        );
        return Json.createObjectBuilder()
        .add("idDrink", this.getIdDrink())
        .add("strDrink", this.getStrDrink())
        .add("strDrinkThumb", this.getStrDrinkThumb())
        .add("strDrinkImage", this.getStrDrinkImage())
        .add("strInstructions", this.strInstructions)
        .addAll(job)
        .build();
    }
}
