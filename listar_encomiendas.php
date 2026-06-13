<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("conexion.php");

$sql = "SELECT * FROM encomiendas ORDER BY id DESC";

$resultado = mysqli_query($conexion, $sql);

$datos = [];

if ($resultado) {
    while($fila = mysqli_fetch_assoc($resultado)){
        $datos[] = $fila;
    }
}

echo json_encode($datos);
?>