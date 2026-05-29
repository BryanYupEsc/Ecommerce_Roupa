package com.vestidos.backend.repository;

import com.vestidos.backend.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Buscar usuario por email (para el login)
    Optional<User> findByEmail(String email);

    // Verificar si un email ya está registrado (para el registro)
    boolean existsByEmail(String email);
}
