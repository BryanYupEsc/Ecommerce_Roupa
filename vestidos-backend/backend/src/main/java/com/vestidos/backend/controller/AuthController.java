package com.vestidos.backend.controller;

import com.vestidos.backend.model.User;
import com.vestidos.backend.repository.UserRepository;
import com.vestidos.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Email o contraseña incorrectos");
        }

        User user = userOpt.get();

        // Usamos BCrypt para comparar en vez de .equals()
        if (!userService.checkPassword(password, user.getPassword())) {
            return ResponseEntity.badRequest().body("Email o contraseña incorrectos");
        }

        return ResponseEntity.ok(user);
    }
    
    
}