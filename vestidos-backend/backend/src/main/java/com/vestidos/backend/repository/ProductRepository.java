package com.vestidos.backend.repository;

import com.vestidos.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Buscar todos los vestidos activos
    List<Product> findByActivoTrue();

    // Buscar por categoría
    List<Product> findByCategoryId(Integer categoryId);

    // Buscar por talla
    List<Product> findByTalla(String talla);

    // Buscar por color
    List<Product> findByColor(String color);
}