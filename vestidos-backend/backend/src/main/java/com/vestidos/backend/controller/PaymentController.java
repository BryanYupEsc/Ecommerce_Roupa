package com.vestidos.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Value("${mercadopago.access.token}")
    private String accessToken;

    @PostMapping("/create-preference")
    public ResponseEntity<?> createPreference(@RequestBody Map<String, Object> body) {
        try {
            List<Map<String, Object>> cartItems = (List<Map<String, Object>>) body.get("items");

            // Construimos los items para MercadoPago
            List<Map<String, Object>> mpItems = new ArrayList<>();
            for (Map<String, Object> item : cartItems) {
                Map<String, Object> mpItem = new HashMap<>();
                mpItem.put("title", item.get("nombre"));
                mpItem.put("quantity", ((Number) item.get("cantidad")).intValue());
                mpItem.put("unit_price", Double.parseDouble(item.get("precio").toString()));
                mpItem.put("currency_id", "BRL");
                mpItems.add(mpItem);
            }
            Integer orderId = ((Number) body.get("orderId")).intValue();

            // URLs de retorno
            Map<String, String> backUrls = new HashMap<>();
            backUrls.put("success", "http://localhost:5173/payment-success");
            backUrls.put("failure", "http://localhost:5173/checkout");
            backUrls.put("pending", "http://localhost:5173/payment-success");

            // Construimos el body de la preferencia
            Map<String, Object> preference = new HashMap<>();
            preference.put("items", mpItems);
            preference.put("back_urls", backUrls);
            preference.put("external_reference", orderId.toString());
            //preference.put("auto_return", "all");

            // Llamamos a la API de MercadoPago
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(accessToken);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(preference, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://api.mercadopago.com/checkout/preferences",
                request,
                Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            return ResponseEntity.ok(Map.of(
                "id", responseBody.get("id"),
                "initPoint", responseBody.get("init_point"),
                "sandboxInitPoint", responseBody.get("sandbox_init_point")
            ));

        } catch (Exception e) {
            System.out.println("ERROR MERCADOPAGO: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}