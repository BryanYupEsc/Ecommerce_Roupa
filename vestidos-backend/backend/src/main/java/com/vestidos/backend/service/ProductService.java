package com.vestidos.backend.service;

import com.vestidos.backend.model.Category;
import com.vestidos.backend.model.Product;
import com.vestidos.backend.repository.CategoryRepository;
import com.vestidos.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findByActivoTrue();
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getProductsByTalla(String talla) {
        return productRepository.findByTalla(talla);
    }

    public Product createProduct(Product product) {
        product.setActivo(true);
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                .orElse(null);
            product.setCategory(category);
        }
        return productRepository.save(product);
    }

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

    public void deleteProduct(Integer id) {
        productRepository.findById(id).ifPresent(product -> {
            product.setActivo(false);
            productRepository.save(product);
        });
    }
}
