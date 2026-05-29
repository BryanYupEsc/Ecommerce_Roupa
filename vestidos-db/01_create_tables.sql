-- creamos la base de datos
CREATE DATABASE vestidos_db;

-- nos concetamos con la base de datos
\c vestidos_db;

-- Ecommerce de vestidos - base de datos

--table 1 Categorias
CREATE TABLE categories (
    id        SERIAL PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio      DECIMAL(10, 2) NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    talla       VARCHAR(10),
    color       VARCHAR(50),
    material    VARCHAR(200),
    imagen_url  VARCHAR(500),
    category_id INTEGER REFERENCES categories(id),
    activo      BOOLEAN DEFAULT TRUE,
    creado_en   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
    id        SERIAL PRIMARY KEY,
    nombre    VARCHAR(150) NOT NULL,
    email     VARCHAR(200) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    rol       VARCHAR(20) DEFAULT 'USER',
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
    id        SERIAL PRIMARY KEY,
    user_id   INTEGER NOT NULL REFERENCES users(id),
    total     DECIMAL(10, 2) NOT NULL,
    estado    VARCHAR(30) DEFAULT 'PENDIENTE',
    direccion VARCHAR(300),
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
    id          SERIAL PRIMARY KEY,
    order_id    INTEGER NOT NULL REFERENCES orders(id),
    product_id  INTEGER NOT NULL REFERENCES products(id),
    cantidad    INTEGER NOT NULL DEFAULT 1,
    precio_unit DECIMAL(10, 2) NOT NULL,
    subtotal    DECIMAL(10, 2) NOT NULL
);

CREATE TABLE cart_items (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    product_id  INTEGER NOT NULL REFERENCES products(id),
    cantidad    INTEGER NOT NULL DEFAULT 1,
    subtotal    DECIMAL(10, 2) NOT NULL,
    agregado_en TIMESTAMPTZ DEFAULT NOW()
);