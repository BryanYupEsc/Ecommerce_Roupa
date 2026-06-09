-- ECOMMERCE DE VESTIDOS - DATOS DE PRUEBA


-- Insertamos datos de prueba en la tabla de categorías

INSERT INTO categories (nombre) VALUES
('Casual'),
('Noche'),
('Playa'),
('Fiesta'),
('Formal');

-- USUARIO ADMIN
INSERT INTO users (nombre, email, password, rol) VALUES
('Admin', 'admin@vestidos.com', 'admin123', 'ADMIN');

-- USUARIO CLIENTE de prueba
INSERT INTO users (nombre, email, password, rol) VALUES
('Maria Silva', 'maria@email.com', 'maria123', 'USER');

-- PRODUCTOS (10 vestidos de prueba)
INSERT INTO products (nombre, descripcion, precio, stock, talla, color, material, category_id) VALUES
('Vestido Casual Floral',      'Vestido liviano con estampado floral, perfecto para el día a día',  89.90, 15, 'M', 'Rosa',     '100% Algodón',                1),
('Vestido Casual Rayas',       'Vestido de rayas horizontales, tela de algodón',                    75.00, 20, 'S', 'Blanco',   '95% Algodón, 5% Elastano',    1),
('Vestido Casual Lino',        'Vestido de lino suelto, muy fresco para el verano',                 95.00, 10, 'L', 'Beige',    '100% Lino',                   1),
('Vestido de Noche Elegante',  'Vestido largo con escote en V, ideal para cenas y eventos',        199.90,  8, 'M', 'Negro',    '100% Poliéster',              2),
('Vestido de Noche Satén',     'Vestido midi de satén con abertura lateral',                       179.90,  5, 'S', 'Rojo',     '80% Seda, 20% Poliéster',     2),
('Vestido de Playa Bohemio',   'Vestido largo con bordados, perfecto para la playa',                69.90, 25, 'M', 'Turquesa', '100% Viscosa',                3),
('Vestido de Playa Corto',     'Vestido corto estampado tropical, ligero y fresco',                 59.90, 30, 'S', 'Amarillo', '100% Algodón',                3),
('Vestido Fiesta Lentejuelas', 'Vestido corto con lentejuelas plateadas, ideal para fiestas',      159.90,  6, 'M', 'Plateado', '90% Poliéster, 10% Elastano', 4),
('Vestido Formal Oficina',     'Vestido recto a la rodilla, sobrio y elegante',                    139.90, 12, 'L', 'Azul',     '70% Lana, 30% Poliéster',     5),
('Vestido Formal Midi',        'Vestido midi con cinturón incluido, perfecto para reuniones',      149.90,  9, 'M', 'Gris',     '65% Algodón, 35% Poliéster',  5);

-- Para evitar problemas de integridad referencial, primero eliminamos los datos relacionados antes de eliminar los usuarios
-- Primero borramos los items de los pedidos
DELETE FROM order_items WHERE order_id IN (
    SELECT id FROM orders WHERE user_id IN (1, 2)
);

-- Luego borramos los pedidos
DELETE FROM orders WHERE user_id IN (1, 2);

-- Ahora sí podemos borrar los usuarios
DELETE FROM users WHERE email IN ('admin@vestidos.com', 'maria@email.com');

-- Volvemos a insertar con contraseñas encriptadas
INSERT INTO users (nombre, email, password, rol) VALUES
('Admin', 'admin@vestidos.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN'),
('Maria Silva', 'maria@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER');