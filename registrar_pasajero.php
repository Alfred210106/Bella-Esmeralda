<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

if(
    empty($data->nombre) ||
    empty($data->dni) ||
    empty($data->destino) ||
    empty($data->asiento) ||
    empty($data->fecha)
){

    echo json_encode([
        "mensaje" => "Campos vacíos"
    ]);

    exit();

}

$nombre = $data->nombre;
$dni = $data->dni;
$destino = $data->destino;
$asiento = $data->asiento;
$fecha = $data->fecha;

$sql = "INSERT INTO pasajeros
(nombre, dni, destino, asiento, fecha)

VALUES
('$nombre', '$dni', '$destino', '$asiento', '$fecha')";

$resultado = mysqli_query($conexion, $sql);

if($resultado){

    echo json_encode([
        "mensaje" => "Pasajero registrado correctamente"
    ]);

}else{

    echo json_encode([
        "mensaje" => "Error al registrar"
    ]);

}

?>