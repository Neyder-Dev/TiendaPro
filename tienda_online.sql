-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 20, 2024 at 03:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tienda_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Electrónica'),
(2, 'Celulares'),
(3, 'Laptops'),
(4, 'Gadgets'),
(5, 'Servicios');

-- --------------------------------------------------------

--
-- Table structure for table `direccion_envio`
--

CREATE TABLE `direccion_envio` (
  `id_envio` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `direccion_envio` varchar(255) NOT NULL,
  `ciudad_envio` varchar(100) NOT NULL,
  `pais_envio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orden`
--

CREATE TABLE `orden` (
  `id_orden` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_envio` int(11) NOT NULL,
  `pago_total_orden` decimal(10,2) NOT NULL,
  `fecha_orden` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orden_producto`
--

CREATE TABLE `orden_producto` (
  `id_orden_producto` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_orden_producto` int(11) NOT NULL,
  `precio_orden_producto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pago_usuario`
--

CREATE TABLE `pago_usuario` (
  `id_pago` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `monto_pago` decimal(10,2) NOT NULL,
  `fecha_pago` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion_producto` text DEFAULT NULL,
  `precio_producto` decimal(10,2) NOT NULL,
  `fecha_producto` date NOT NULL,
  `stock_producto` int(11) NOT NULL,
  `imagen_producto` varchar(255) DEFAULT NULL,
  `ventas_producto` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`id_producto`, `id_categoria`, `nombre_producto`, `descripcion_producto`, `precio_producto`, `fecha_producto`, `stock_producto`, `imagen_producto`, `ventas_producto`) VALUES
(1, 2, 'Apple iPhone 13 256 Gb', 'pantalla OLED de 6.1 pulgadas, Apple A15 Bionic, 256GB. La cámara es dual de 12MP, cámara frontal es de 12MP.', 2500000.00, '2024-11-17', 10, '/TiendaPro/Images/iphone13.jpg', 0),
(2, 1, 'Televisor Samsung 50\" 4K', 'Televisor UHD con pantalla LED, resolución 4K y tecnología HDR10+.', 1800000.00, '2024-11-01', 15, '/TiendaPro/Images/tv50.jpg', 3),
(3, 2, 'Samsung Galaxy S23', 'Smartphone con procesador Snapdragon 8 Gen 2 y pantalla Dynamic AMOLED 2X de 6.1\".', 3200000.00, '2024-11-02', 8, '/TiendaPro/Images/s23.jpg', 2),
(4, 3, 'MacBook Air M2', 'Portátil ultraligero con chip M2, pantalla Retina de 13.6 pulgadas y diseño sin ventilador.', 5000000.00, '2024-11-03', 6, '/TiendaPro/Images/macbookair.jpg', 1),
(5, 4, 'Reloj Inteligente Xiaomi Band 7', 'Smartwatch con monitor de actividad, pantalla AMOLED y duración de batería de 14 días.', 250000.00, '2024-11-04', 20, '/TiendaPro/Images/xiaomiband7.jpg', 5),
(6, 5, 'Servicio de Mantenimiento PC', 'Servicio técnico completo para optimización y limpieza de computadoras.', 100000.00, '2024-11-05', 0, '/TiendaPro/Images/mantenimiento.jpg', 10),
(7, 1, 'Barra de Sonido Bose', 'Sonido envolvente de alta calidad para TV y música.', 1200000.00, '2024-11-06', 10, '/TiendaPro/Images/bosesoundbar.jpg', 4),
(8, 2, 'iPhone 14 Pro Max', 'Smartphone con chip A16 Bionic, pantalla Super Retina XDR y Dynamic Island.', 6500000.00, '2024-11-07', 5, '/TiendaPro/Images/iphone14pro.jpg', 76),
(9, 3, 'Lenovo ThinkPad X1 Carbon', 'Portátil empresarial ligero con pantalla de 14 pulgadas, procesador Intel i7.', 4000000.00, '2024-11-08', 7, '/TiendaPro/Images/thinkpadx1.jpg', 2),
(10, 4, 'Cámara GoPro Hero 11', 'Cámara de acción con grabación 5.3K, estabilización mejorada y diseño sumergible.', 2300000.00, '2024-11-09', 12, '/TiendaPro/Images/gopro11.jpg', 6),
(11, 5, 'Asesoría de Software Empresarial', 'Servicio especializado en implementación y mejora de software para empresas.', 200000.00, '2024-11-10', 0, '/TiendaPro/Images/asesoria.jpg', 8),
(12, 1, 'Consola PlayStation 5', 'Consola de videojuegos con soporte 4K, SSD de 1 TB y mando DualSense.', 2800000.00, '2024-11-11', 9, '/TiendaPro/Images/ps5.jpg', 7),
(13, 2, 'Motorola Edge 40', 'Smartphone con pantalla curva OLED de 6.55\", procesador Dimensity 8020 y carga rápida.', 1900000.00, '2024-11-12', 10, '/TiendaPro/Images/motoedge40.jpg', 4),
(14, 3, 'Dell XPS 13', 'Ultrabook con pantalla InfinityEdge, procesador Intel i5 y acabado en aluminio.', 3200000.00, '2024-11-13', 0, '/TiendaPro/Images/dellxps13.jpg', 1),
(15, 4, 'Audífonos Sony WH-1000XM5', 'Auriculares inalámbricos con cancelación de ruido de alta calidad y sonido Hi-Res.', 1500000.00, '2024-11-14', 8, '/TiendaPro/Images/sonyxm5.jpg', 3),
(16, 5, 'Reparación de Pantalla de Celular', 'Cambio de pantallas dañadas para dispositivos móviles.', 250000.00, '2024-11-15', 0, '/TiendaPro/Images/reparacion.jpg', 12);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Cliente');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `apellido_usuario` varchar(100) NOT NULL,
  `correo_usuario` varchar(100) NOT NULL,
  `contrasena_usuario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_rol`, `nombre_usuario`, `apellido_usuario`, `correo_usuario`, `contrasena_usuario`) VALUES
(1, 1, 'Usuario', 'Prueba', 'usuario.prueba@gmail.com', 'password123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indexes for table `direccion_envio`
--
ALTER TABLE `direccion_envio`
  ADD PRIMARY KEY (`id_envio`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_envio` (`id_envio`);

--
-- Indexes for table `orden_producto`
--
ALTER TABLE `orden_producto`
  ADD PRIMARY KEY (`id_orden_producto`),
  ADD KEY `id_orden` (`id_orden`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indexes for table `pago_usuario`
--
ALTER TABLE `pago_usuario`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo_usuario` (`correo_usuario`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `direccion_envio`
--
ALTER TABLE `direccion_envio`
  MODIFY `id_envio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orden`
--
ALTER TABLE `orden`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orden_producto`
--
ALTER TABLE `orden_producto`
  MODIFY `id_orden_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pago_usuario`
--
ALTER TABLE `pago_usuario`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

--
-- Constraints for table `direccion_envio`
--
ALTER TABLE `direccion_envio`
  ADD CONSTRAINT `direccion_envio_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `orden_ibfk_2` FOREIGN KEY (`id_envio`) REFERENCES `direccion_envio` (`id_envio`);

--
-- Constraints for table `orden_producto`
--
ALTER TABLE `orden_producto`
  ADD CONSTRAINT `orden_producto_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`) ON DELETE CASCADE,
  ADD CONSTRAINT `orden_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

--
-- Constraints for table `pago_usuario`
--
ALTER TABLE `pago_usuario`
  ADD CONSTRAINT `pago_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE;

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
