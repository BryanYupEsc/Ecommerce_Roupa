package com.vestidos.backend.controller;

import com.vestidos.backend.model.Product;
import com.vestidos.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Permitir solicitudes desde el frontend
public class ProductController {
    @Autowired   
    private ProductService productService;
    
    //get /api/products
    // el lciente visualiza los vestidos
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    //GET /api/products/1
    // el cliente ve el detalle del vestido
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //GET /api/products/category/1
    // el cliente ve los vestidos por categoría
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

    //GET /api/products/talla/M
    // el cliente ve los vestidos por talla
    @GetMapping("/talla/{talla}")
    public List<Product> getProductsByTalla(@PathVariable String talla) {
        return productService.getProductsByTalla(talla);
    }

    //POST /api/products/
    // el admin crea un vestido nuevo
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    //PUT /api/products/1
    // el admin actualiza un vestido
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product productDetails) {
        return productService.updateProduct(id, productDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //DELETE /api/products/1
    // el admin elimina un vestido (desactiva)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
