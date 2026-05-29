package com.vestidos.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unit", nullable = false)
    private BigDecimal precioUnit;

    @Column(nullable = false)
    private BigDecimal subtotal;

    // Getters y Setters
    public Integer getId() 
    { 
        return id; 
    }
    public void setId(Integer id) 
    { 
        this.id = id; 
    }
// ===================================
    public Order getOrder() 
    { 
        return order; 
    }
    public void setOrder(Order order) 
    { 
        this.order = order; 
    }
// ===================================
    public Product getProduct() 
    { 
        return product; 
    }
    public void setProduct(Product product) 
    { 
        this.product = product; 
    }
// ===================================
    public Integer getCantidad() 
    { 
        return cantidad; 
    }
    public void setCantidad(Integer cantidad) 
    { 
        this.cantidad = cantidad; 
    }
// ===================================
    public BigDecimal getPrecioUnit() 
    { 
        return precioUnit; 
    }
    public void setPrecioUnit(BigDecimal precioUnit) 
    { 
        this.precioUnit = precioUnit; 
    }
// ===================================
    public BigDecimal getSubtotal() 
    { 
        return subtotal; 
    }
    public void setSubtotal(BigDecimal subtotal) 
    { 
        this.subtotal = subtotal; 
    }
}
