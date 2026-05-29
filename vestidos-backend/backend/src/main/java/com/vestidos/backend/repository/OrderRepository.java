package com.vestidos.backend.repository;

import com.vestidos.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    // Traer todos los pedidos de un usuario
    List<Order> findByUserId(Integer userId);

    // Traer pedidos por estado (PENDIENTE, PAGADO, etc)
    List<Order> findByEstado(String estado);
}
