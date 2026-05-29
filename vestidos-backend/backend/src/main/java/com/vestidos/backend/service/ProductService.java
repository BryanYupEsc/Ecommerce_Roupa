package com.vestidos.backend.service;

import com.vestidos.backend.model.Product;
import com.vestidos.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Obtener todos los vestidos activos
    public List<Product> getAllProducts() {
        return productRepository.findByActivoTrue();
    }

    // Obtener un vestido por id
    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    // Obtener vestidos por categoría
    public List<Product> getProductsByCategory(Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    // Obtener vestidos por talla
    public List<Product> getProductsByTalla(String talla) {
        return productRepository.findByTalla(talla);
    }

    // Crear un vestido nuevo (para el admin)
    public Product createProduct(Product product) {
        product.setActivo(true);
        return productRepository.save(product);
    }

    // Actualizar un vestido (para el admin)
    public Optional<Product> updateProduct(Integer id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setNombre(productDetails.getNombre());
            product.setDescripcion(productDetails.getDescripcion());
            product.setPrecio(productDetails.getPrecio());
            product.setStock(productDetails.getStock());
            product.setTalla(productDetails.getTalla());
            product.setColor(productDetails.getColor());
            product.setMaterial(productDetails.getMaterial());
            product.setImagenUrl(productDetails.getImagenUrl());
            product.setCategory(productDetails.getCategory());
            return productRepository.save(product);
        });
    }

    // Eliminar un vestido (desactivar, no borrar)
    public void deleteProduct(Integer id) {
        productRepository.findById(id).ifPresent(product -> {
            product.setActivo(false);
            productRepository.save(product);
        });
    }
}
