<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("conexion.php");

$datos = json_decode(file_get_contents("php://input"));

$remitente = $datos->remitente;
$destinatario = $datos->destinatario;
$descripcion = $datos->descripcion;
$destino = $datos->destino;
$estado = $datos->estado;
// Nuevos campos obligatorios agregados en la BD
$fecha_envio = $datos->fecha_envio;
$peso = floatval($datos->peso);
$precio_envio = floatval($datos->precio_envio);

$sql = "INSERT INTO encomiendas (remitente, destinatario, descripcion, destino, estado, fecha_envio, peso, precio_envio) 
        VALUES ('$remitente', '$destinatario', '$descripcion', '$destino', '$estado', '$fecha_envio', $peso, $precio_envio)";

if(mysqli_query($conexion, $sql)){
    echo json_encode([
        "mensaje" => "Encomienda registrada"
    ]);
}else{
    echo json_encode([
        "mensaje" => "Error al registrar: " . mysqli_error($conexion)
    ]);
}

?>