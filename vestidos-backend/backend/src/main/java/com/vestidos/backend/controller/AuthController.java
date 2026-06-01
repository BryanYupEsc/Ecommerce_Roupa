package com.vestidos.backend.controller;

import com.vestidos.backend.model.User;
import com.vestidos.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        System.out.println("Email recibido: " + email);
        System.out.println("Password recibido: " + password);

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            System.out.println("Usuario no encontrado");
            return ResponseEntity.badRequest().body("Email o contraseña incorrectos");
        }

        User user = userOpt.get();
        System.out.println("Password en BD: " + user.getPassword());
        System.out.println("¿Coincide?: " + user.getPassword().equals(password));

        if (!user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Email o contraseña incorrectos");
        }

        return ResponseEntity.ok(user);
    }
}