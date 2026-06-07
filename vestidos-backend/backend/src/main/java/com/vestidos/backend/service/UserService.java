package com.vestidos.backend.service;

import com.vestidos.backend.model.User;
import com.vestidos.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // BCryptPasswordEncoder es la herramienta que encripta => si el usuariao escribe admin123 guarda => $2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36S0E0i9yTt8Yy/2.5i
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {//devuelve una lista de usuarios
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {//busca un usuario por su id y devuelve un Optional que puede contener el usuario o estar vacío si no se encuentra
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {//busca un usuario por su email y devuelve un Optional que puede contener el usuario o estar vacío si no se encuentra
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        // Encriptamos la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRol("USER");
        return userRepository.save(user);
    }

    public Optional<User> updateUser(Integer id, User userDetails) {//busca un usuario por su id, actualiza sus detalles y lo guarda en la base de datos. Devuelve un Optional que puede contener el usuario actualizado o estar vacío si no se encuentra el usuario original
        return userRepository.findById(id).map(user -> {
            user.setNombre(userDetails.getNombre());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        });
    }

    // Método para verificar contraseña en el login
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}