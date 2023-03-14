package com.vttpfinalproject.backend.services;

import java.io.Reader;
import java.io.StringReader;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class HttpService {
    
    public ResponseEntity<String> fetch(String url) {
        RestTemplate template = new RestTemplate();
        RequestEntity<Void> req = RequestEntity.get(url).build();
        try {
            ResponseEntity<String> res = template.exchange(req, String.class);
            return res;
        } catch (Exception e) {
            System.err.print(e);
            return null;
        }
    }

    public JsonObject readApiResponse(ResponseEntity<String> apiResponse) {
        String s = apiResponse.getBody();
        Reader reader = new StringReader(s);
        JsonReader jr = Json.createReader(reader);
        return jr.readObject();
    }
}
