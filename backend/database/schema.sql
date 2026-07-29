-- Base de datos: pwa_integrador
-- Ejecutar con: mysql -u <usuario> -p < backend/database/schema.sql

CREATE DATABASE IF NOT EXISTS pwa_integrador
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE pwa_integrador;

-- --------------------------------------------------------
-- Tabla: categorias
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
  id    INT          NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla: productos
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
  id           INT            NOT NULL AUTO_INCREMENT,
  nombre       VARCHAR(255)   NOT NULL,
  descripcion  TEXT           NOT NULL,
  precio       DECIMAL(10, 2) NOT NULL,
  imagen       VARCHAR(500)   NOT NULL,
  categoria_id INT            NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_productos_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Datos de ejemplo
-- --------------------------------------------------------
INSERT INTO categorias (nombre) VALUES
  ('Electrónica'),
  ('Indumentaria'),
  ('Hogar');

INSERT INTO productos (nombre, descripcion, precio, imagen, categoria_id) VALUES
  ('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido y batería de 30 h.', 25999.00, 'https://via.placeholder.com/600x600?text=Auriculares', 1),
  ('Smartwatch Sport', 'Reloj inteligente con monitor cardíaco, GPS y resistencia al agua.', 49999.00, 'https://via.placeholder.com/600x600?text=Smartwatch', 1),
  ('Remera algodón', 'Remera 100% algodón, disponible en varios colores y talles.', 8999.00, 'https://via.placeholder.com/600x600?text=Remera', 2),
  ('Zapatillas running', 'Zapatillas livianas con suela amortiguante para entrenamiento diario.', 34999.00, 'https://via.placeholder.com/600x600?text=Zapatillas', 2),
  ('Cafetera express', 'Cafetera de 15 bares de presión, depósito de 1.2 l y vaporizador.', 62999.00, 'https://via.placeholder.com/600x600?text=Cafetera', 3),
  ('Lámpara LED escritorio', 'Lámpara regulable en intensidad y temperatura de color, puerto USB.', 12499.00, 'https://via.placeholder.com/600x600?text=Lampara', 3);
