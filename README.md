# Vestidos E-commerce 👗

Plataforma de e-commerce full stack para venta de vestidos online, con catálogo de productos, carrito de compras, checkout con pagos reales vía **Mercado Pago**, y panel administrativo completo para gestión de productos y pedidos.

> Full stack e-commerce platform for an online dress shop, featuring a product catalog, shopping cart, real payment checkout via **Mercado Pago**, and a complete admin dashboard for managing products and orders.

---

## 🧩 Stack técnico / Tech Stack

| Camada | Tecnologias |
|---|---|
| **Frontend** | React 19, Vite, React Router, Zustand (state management), Axios, Swiper |
| **Backend** | Java 17, Spring Boot 3.5, Spring Security, Spring Data JPA |
| **Base de datos** | PostgreSQL |
| **Pagos** | Mercado Pago SDK (Java + React) |
| **Imágenes** | Cloudinary |

---

## ✨ Funcionalidades principales

- 🛍️ Catálogo de productos con categorías, tallas, colores y stock
- 🛒 Carrito de compras persistente (Zustand)
- 💳 Checkout con integración real a **Mercado Pago** (creación de preferencia + verificación de pago)
- 🔐 Registro / login de usuarios con contraseñas encriptadas (BCrypt)
- 📦 Gestión de pedidos (creación, estado, historial)
- 🛠️ **Panel de administrador**: CRUD de productos, gestión de pedidos y dashboard
- ☁️ Subida de imágenes de producto a Cloudinary
- 🌐 API REST documentada por recurso (`/api/products`, `/api/orders`, `/api/auth`, `/api/payment`, `/api/users`)

---

## 🏗️ Arquitectura

```
Ecommerce_Roupa/
├── vestidos-frontend/     # React + Vite
│   └── src/
│       ├── pages/         # Home, Cart, Checkout, Login, Admin...
│       ├── components/    # Navbar, Footer, Logo
│       ├── store/         # Zustand (auth, cart)
│       └── services/      # Axios API, Cloudinary
│
├── vestidos-backend/
│   └── backend/
│       └── src/main/java/com/vestidos/backend/
│           ├── controller/   # REST endpoints
│           ├── service/      # Lógica de negocio
│           ├── repository/   # Spring Data JPA
│           ├── model/        # Entidades (Product, User, Order...)
│           └── security/     # Spring Security config
│
└── vestidos-db/
    ├── 01_create_tables.sql
    └── 02_seed_data.sql
```

Arquitectura en capas (*layered architecture*) con separación clara entre Controller → Service → Repository, siguiendo buenas prácticas de Spring Boot.

---

## 🚀 Cómo correrlo localmente

### Requisitos previos
- Node.js 18+
- Java 17+
- PostgreSQL 14+
- Cuenta de Mercado Pago (sandbox) para las credenciales de pago

### 1. Base de datos
```bash
psql -U postgres -f vestidos-db/01_create_tables.sql
psql -U postgres -f vestidos-db/02_seed_data.sql
```

### 2. Backend (Spring Boot)
```bash
cd vestidos-backend/backend
# configurar application.properties con tu conexión a PostgreSQL
# y tu access token de Mercado Pago (mercadopago.access.token)
./mvnw spring-boot:run
```
El backend corre en `http://localhost:8080`

### 3. Frontend (React + Vite)
```bash
cd vestidos-frontend
npm install
npm run dev
```
El frontend corre en `http://localhost:5173`

---

## 📸 Capturas de pantalla

> _(Agregar aquí 2-3 capturas: home, carrito/checkout y panel admin)_

---

## 👤 Autor

**Bryan Yupanqui Escudero**
Full Stack Developer — React · Spring Boot · Node.js · PostgreSQL
[GitHub](https://github.com/BryanYupEsc) · bryan.devsoftware@gmail.com

---

## 🇧🇷 Sobre o projeto (Português)

Plataforma de e-commerce full stack para venda de vestidos, com catálogo de produtos, carrinho de compras, checkout com pagamento real via **Mercado Pago** e painel administrativo completo para gestão de produtos e pedidos.

**Principais funcionalidades:** catálogo com categorias/tamanhos/estoque, carrinho persistente, checkout integrado ao Mercado Pago, autenticação com senha criptografada (BCrypt), gestão de pedidos, painel admin (CRUD de produtos e pedidos) e upload de imagens via Cloudinary.

**Stack:** React 19 + Vite + Zustand no frontend; Java 17 + Spring Boot 3.5 + Spring Security + JPA no backend; PostgreSQL como banco de dados.
