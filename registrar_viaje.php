<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

if(!$data){
    exit;
}

$destino = $data->destino;
$hora = $data->hora;
$chofer = $data->chofer;
$vehiculo = $data->vehiculo;
$estado = $data->estado;
// Nuevos campos obligatorios agregados en la BD
$fecha = $data->fecha;
$precio_pasaje = floatval($data->precio_pasaje);
$asientos_disponibles = intval($data->asientos_disponibles);

$sql = "INSERT INTO viajes (destino, hora, chofer, vehiculo, estado, fecha, precio_pasaje, asientos_disponibles) 
        VALUES ('$destino', '$hora', '$chofer', '$vehiculo', '$estado', '$fecha', $precio_pasaje, $asientos_disponibles)";

$resultado = mysqli_query($conexion, $sql);

if($resultado){
    echo json_encode([
        "mensaje" => "Viaje registrado correctamente"
    ]);
}else{
    echo json_encode([
        "mensaje" => "Error al registrar: " . mysqli_error($conexion)
    ]);
}

?>