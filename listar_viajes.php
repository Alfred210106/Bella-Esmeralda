<?php

header("Access-Control-Allow-Origin: *");

include 'conexion.php';

$sql = "SELECT * FROM viajes";

$resultado = mysqli_query($conexion, $sql);

$viajes = [];

while($fila = mysqli_fetch_assoc($resultado)){
    $viajes[] = $fila;
}

echo json_encode($viajes);

?>