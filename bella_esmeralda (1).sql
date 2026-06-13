-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2026 a las 06:46:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bella_esmeralda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encomiendas`
--

CREATE TABLE `encomiendas` (
  `id` int(11) NOT NULL,
  `remitente` varchar(100) DEFAULT NULL,
  `destinatario` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `fecha_envio` datetime NOT NULL DEFAULT current_timestamp(),
  `destino` varchar(100) DEFAULT NULL,
  `peso` decimal(10,2) NOT NULL DEFAULT 0.00,
  `precio_envio` decimal(10,2) NOT NULL DEFAULT 0.00,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `encomiendas`
--

INSERT INTO `encomiendas` (`id`, `remitente`, `destinatario`, `descripcion`, `fecha_envio`, `destino`, `peso`, `precio_envio`, `estado`) VALUES
(1, 'Raquel', 'Liseth', 'El paquete que se envia es muy frágil por favor co...', '2026-06-10 00:00:00', 'Huanta', 2.00, 5.00, 'En ruta'),
(2, 'Raquel', 'Liseth', 'El paquete que se envia es muy frágil por favor co...', '2026-06-10 00:00:00', 'Huanta', 2.00, 5.00, 'En ruta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajeros`
--

CREATE TABLE `pasajeros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `viaje_id` int(11) NOT NULL,
  `asiento` varchar(100) DEFAULT NULL,
  `fecha` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pasajeros`
--

INSERT INTO `pasajeros` (`id`, `nombre`, `dni`, `viaje_id`, `asiento`, `fecha`) VALUES
(1, 'Javier Ortiz Ventura', '73462950', 1, '3', '2026-06-10'),
(2, 'Juan Alberto Quispe', '45781236', 1, '1', '2026-06-10'),
(3, 'María Elena Cárdenas', '72419853', 1, '2', '2026-06-10'),
(4, 'Javier Ventura Ortiz', '75349820', 1, '2', '2026-06-11'),
(5, 'Javier Ventura Ortiz', '743425685', 1, '2', '2026-06-11'),
(6, 'Luis Quispe Ore', '23643848', 2, '3', '2026-06-11'),
(7, 'Javier Ortiz Ventura', '73462950', 1, '3', '2026-06-10'),
(8, 'Juan Alberto Quispe', '45781236', 1, '1', '2026-06-10'),
(9, 'María Elena Cárdenas', '72419853', 1, '2', '2026-06-10'),
(10, 'Javier Ventura Ortiz', '75349820', 1, '2', '2026-06-11'),
(11, 'Javier Ventura Ortiz', '743425685', 1, '2', '2026-06-11'),
(12, 'Luis Quispe Ore', '23643848', 2, '3', '2026-06-11'),
(13, 'Alfred Gian Piero', '72744207', 1, '3', '2026-06-11'),
(14, 'paolo david', '64424365', 1, '2', '2026-06-11'),
(15, 'paolo david', '60785623', 1, '2', '2026-06-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `placa` varchar(20) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `placa`, `modelo`, `capacidad`, `tipo`, `estado`) VALUES
(1, 'F3V-950', 'Toyota Probox', 4, 'Auto', 'Activo'),
(2, 'F3V-950', 'Toyota Probox', 4, 'Auto', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `id` int(11) NOT NULL,
  `destino` varchar(100) DEFAULT NULL,
  `hora` varchar(100) DEFAULT NULL,
  `fecha` varchar(100) DEFAULT NULL,
  `chofer` varchar(100) DEFAULT NULL,
  `vehiculo` varchar(100) DEFAULT NULL,
  `precio_pasaje` varchar(100) DEFAULT NULL,
  `asientos_disponibles` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`id`, `destino`, `hora`, `fecha`, `chofer`, `vehiculo`, `precio_pasaje`, `asientos_disponibles`, `estado`) VALUES
(1, 'Huanta - Huamanga', '08:30 AM', '2026-06-10', 'Carlos Mendoza', 'Toyota - F3V-950', '10.00', '4', 'En Cola'),
(2, 'Huamanga', '03:50', '2026-06-12', 'Roberto Flores Espinoza', 'Toyota', '10', '4', 'En Ruta'),
(3, 'Huanta - Huamanga', '08:30 AM', '2026-06-10', 'Carlos Mendoza', 'Toyota - F3V-950', '10.00', '4', 'En Cola'),
(4, 'Huamanga', '03:50', '2026-06-12', 'Roberto Flores Espinoza', 'Toyota', '10', '4', 'En Ruta'),
(5, 'Huamanga', '12:00', '2026-06-12', 'Luises Escajadillo ', 'Toyota k56', '10', '4', 'En Ruta');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encomiendas`
--
ALTER TABLE `encomiendas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pasajeros_viajes` (`viaje_id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encomiendas`
--
ALTER TABLE `encomiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD CONSTRAINT `fk_pasajeros_viajes` FOREIGN KEY (`viaje_id`) REFERENCES `viajes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
