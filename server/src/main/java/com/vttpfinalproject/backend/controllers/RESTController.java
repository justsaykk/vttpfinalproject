package com.vttpfinalproject.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vttpfinalproject.backend.models.DetailedDrink;
import com.vttpfinalproject.backend.models.Drink;
import com.vttpfinalproject.backend.services.DrinkService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://vttpfinalproject.vercel.app"})
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RESTController {

    @Autowired
    private DrinkService drinkSvc;
    
    @GetMapping(path = "/menu")
    public ResponseEntity<String> getMenu(
        @RequestParam(name = "ingredient") String ingredient) {
            String searchTerm = ingredient.toLowerCase().replaceAll(" ", "+");
            List<Drink> listOfCocktails = drinkSvc.fetchDrinksByIngredients(searchTerm);
            JsonArrayBuilder jab = Json.createArrayBuilder();
            listOfCocktails.stream().forEach((drink) -> jab.add(drink.toJson()));

            return new ResponseEntity<String>(
            Json.createObjectBuilder().add("result", jab).build().toString()
            , HttpStatus.OK);
    }

    @GetMapping(path = "/drink/{id}")
    public ResponseEntity<String> getDrinkById(
        @PathVariable(name = "id") String drinkId
    ) {
        DetailedDrink detailedDrink = drinkSvc.fetchDrinkById(drinkId);
        return new ResponseEntity<String>(detailedDrink.toJson().toString(), HttpStatus.OK);
    }

}
