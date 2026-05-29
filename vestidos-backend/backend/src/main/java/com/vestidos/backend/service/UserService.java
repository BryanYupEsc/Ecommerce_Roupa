package com.vestidos.backend.service;

import com.vestidos.backend.model.User;
import com.vestidos.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Traer todos los usuarios (admin)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Buscar usuario por id
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Buscar usuario por email (para login)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Registrar usuario nuevo
    public User createUser(User user) {
        // Verificar si el email ya existe
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        user.setRol("USER");
        return userRepository.save(user);
    }

    // Actualizar usuario
    public Optional<User> updateUser(Integer id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setNombre(userDetails.getNombre());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        });
    }
}