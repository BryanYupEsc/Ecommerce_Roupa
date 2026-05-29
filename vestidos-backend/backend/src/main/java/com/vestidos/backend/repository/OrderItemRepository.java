package com.vestidos.backend.repository;

import com.vestidos.backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    // Traer todos los items de un pedido
    List<OrderItem> findByOrderId(Integer orderId);
}
