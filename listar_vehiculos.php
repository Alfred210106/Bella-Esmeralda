<?php

header("Access-Control-Allow-Origin: *");

include 'conexion.php';

$sql = "SELECT * FROM vehiculos";

$resultado = mysqli_query($conexion, $sql);

$vehiculos = [];

while($fila = mysqli_fetch_assoc($resultado)){

    $vehiculos[] = $fila;

}

echo json_encode($vehiculos);

?>