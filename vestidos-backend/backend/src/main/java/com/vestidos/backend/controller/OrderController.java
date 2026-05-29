package com.vestidos.backend.controller;

import com.vestidos.backend.model.Order;
import com.vestidos.backend.model.OrderItem;
import com.vestidos.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // GET /api/orders
    // Admin ve todos los pedidos
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // GET /api/orders/1
    // Ver detalle de un pedido
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/orders/user/1
    // Ver pedidos de un usuario específico
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Integer userId) {
        return orderService.getOrdersByUser(userId);
    }

    // GET /api/orders/1/items
    // Ver los vestidos dentro de un pedido
    @GetMapping("/{id}/items")
    public List<OrderItem> getOrderItems(@PathVariable Integer id) {
        return orderService.getOrderItems(id);
    }

    // POST /api/orders
    // Cliente crea un pedido nuevo
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    // PUT /api/orders/1/estado
    // Admin actualiza el estado del pedido
    @PutMapping("/{id}/estado")
    public ResponseEntity<Order> updateEstado(
        @PathVariable Integer id,
        @RequestParam String estado) {
        return orderService.updateEstado(id, estado)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/orders/1/cancel
    // Cliente cancela su pedido
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Integer id) {
        return orderService.cancelOrder(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}