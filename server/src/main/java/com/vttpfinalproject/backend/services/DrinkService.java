package com.vttpfinalproject.backend.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.vttpfinalproject.backend.models.DetailedDrink;
import com.vttpfinalproject.backend.models.Drink;

import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@Service
public class DrinkService {

    @Autowired
    private HttpService httpSvc;

    public List<Drink> fetchDrinksByIngredients(String ingredient) {
        // Build API call URL
        String uri = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
        String url = UriComponentsBuilder.fromUriString(uri)
                .queryParam("i", ingredient.toLowerCase())
                .toUriString();

        ResponseEntity<String> apiResponse = httpSvc.fetch(url);
        List<Drink> listOfCocktails = new LinkedList<>();
        if (null == apiResponse.getBody()) {
            return listOfCocktails;
        }

        // Manipulating output
        JsonObject jo = httpSvc.readApiResponse(apiResponse);
        JsonArray jsonArray = jo.getJsonArray("drinks");
        for (int i = 0; i < jsonArray.size(); i++) {
            listOfCocktails.add(new Drink(jsonArray.getJsonObject(i)));
        }
        return listOfCocktails;
    }

    public DetailedDrink fetchDrinkById(String id) {
        // Build API Call URL:
        String uri = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php";
        String url = UriComponentsBuilder.fromUriString(uri)
                .queryParam("i", id)
                .toUriString();

        // Manipulate Response:
        ResponseEntity<String> apiResponse = httpSvc.fetch(url);
        JsonObject jo = httpSvc.readApiResponse(apiResponse);
        JsonArray jsonArray = jo.getJsonArray("drinks");
        JsonObject jsonDrinkElement = jsonArray.getJsonObject(0);
        return new DetailedDrink(jsonDrinkElement);
    }

    public List<Drink> fetchDrinksByName(String drinkName) {
        String uri = "https://www.thecocktaildb.com/api/json/v1/1/search.php";
        String url = UriComponentsBuilder.fromUriString(uri)
                .queryParam("s", drinkName)
                .toUriString();
        ResponseEntity<String> apiResponse = httpSvc.fetch(url);

        List<Drink> listOfCocktails = new LinkedList<>();
        if (null == apiResponse.getBody()) {
            return listOfCocktails;
        }
        JsonObject jo = httpSvc.readApiResponse(apiResponse);
        if (jo.isNull("drinks")) {
            return listOfCocktails;
        }
        JsonArray jsonArray = jo.getJsonArray("drinks");
        for (int i = 0; i < jsonArray.size(); i++) {
            JsonObject jsonDrinkElement = jsonArray.getJsonObject(i);
            listOfCocktails.add(new Drink(jsonDrinkElement));
        }
        System.out.println(listOfCocktails);
        return listOfCocktails;
    }
}
