<?php

header("Access-Control-Allow-Origin: *");

include 'conexion.php';

$sql = "SELECT * FROM pasajeros";

$resultado = mysqli_query($conexion, $sql);

$pasajeros = [];

while($fila = mysqli_fetch_assoc($resultado)){

    $pasajeros[] = $fila;

}

echo json_encode($pasajeros);

?>