package com.vestidos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vestidos.backend.model.Order;
import com.vestidos.backend.model.OrderItem;
import com.vestidos.backend.repository.OrderItemRepository;
import com.vestidos.backend.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    //traer todos lo pedidos del (ADMIN)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    //traer pedidos de un usuario especifico
    public List<Order> getOrdersByUser(Integer userId) {
        return orderRepository.findByUserId(userId);
    }

    //traer un pedido por ID
    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    //traer items de un pedido
    public List<OrderItem> getOrderItems(Integer orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    //crear un pedido nuevo
    public Order createOrder(Order order) {
        order.setEstado("PENDIENTE");
        return orderRepository.save(order);
    }

    //actualizar el estado de un pedido(ADMIN)
    public Optional<Order> updateEstado(Integer id, String estado) {
        return orderRepository.findById(id).map(order ->{
            order.setEstado(estado);
            return orderRepository.save(order);
        });
    }

    //CANCELAR UN PEDIDO admin o usuario
    public Optional<Order> cancelOrder(Integer id) {
        return orderRepository.findById(id).map(order ->{
            order.setEstado("CANCELADO");
            return orderRepository.save(order);
        });
    }
}
