package com.vttpfinalproject.backend.controllers;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.vttpfinalproject.backend.models.CartItem;
import com.vttpfinalproject.backend.models.Drink;
import com.vttpfinalproject.backend.services.DrinkService;
import com.vttpfinalproject.backend.services.StripeService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RESTController {

    @Autowired
    private DrinkService drinkSvc;

    @Autowired
    private StripeService stripeSvc;
    
    @GetMapping(path = "/menu")
    public ResponseEntity<String> getMenu(
        @RequestParam(name = "ingredient") String ingredient) {
        // System.out.printf("Received get request at /menu for %s\n", ingredient);

        String searchTerm = ingredient.toLowerCase().replaceAll(" ", "+");
        List<Drink> listOfCocktails = drinkSvc.fetchDrinksByIngredients(searchTerm);
        JsonArrayBuilder jab = Json.createArrayBuilder();
        listOfCocktails.stream().forEach((drink) -> jab.add(drink.toJson()));
        
        // This is to proc the progress spinner in Angular hahahaha
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<String>(
        Json.createObjectBuilder().add("result", jab).build().toString()
        , HttpStatus.OK);
    }

    @PostMapping(path = "/payment", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void processPayment(
        @RequestBody CartItem[] cartItems
    ) throws StripeException {
        stripeSvc.toStripePayments(cartItems);
    }
}
