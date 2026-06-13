<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

$sql = "SELECT p.*, v.destino, v.vehiculo, v.precio_pasaje 
        FROM pasajeros p 
        INNER JOIN viajes v ON p.viaje_id = v.id";

$resultado = mysqli_query($conexion, $sql);

$pasajeros = [];

if ($resultado) {
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $pasajeros[] = $fila;
    }
}

echo json_encode($pasajeros);
?>