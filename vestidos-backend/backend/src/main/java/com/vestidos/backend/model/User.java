package com.vestidos.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.OffsetDateTime;


@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol;

    @Column(name = "creado_en")
    private OffsetDateTime creadoEn;

//====== GETTERS AND SETTERS========================

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
//===================================
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
//===================================
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
//===================================
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
//===================================
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }
//===================================
    public OffsetDateTime getCreadoEn() {
        return creadoEn;
    }
    public void setCreadoEn(OffsetDateTime creadoEn) {
        this.creadoEn = creadoEn;
    }

}
