<?php

file_put_contents(
    "debug_vehiculos.txt",
    "INSERT\n",
    FILE_APPEND
);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'conexion.php';

$data = json_decode(
    file_get_contents("php://input")
);

if(
    !$data ||
    !isset($data->placa)
){
    exit;
}

$placa = $data->placa;
$modelo = $data->modelo;
$capacidad = $data->capacidad;
$tipo = $data->tipo;
$estado = $data->estado;

if(
    $placa == "" ||
    $modelo == "" ||
    $capacidad == "" ||
    $tipo == "" ||
    $estado == ""
){
    exit;
}

$sql = "INSERT INTO vehiculos
(
    placa,
    modelo,
    capacidad,
    tipo,
    estado
)

VALUES
(
    '$placa',
    '$modelo',
    '$capacidad',
    '$tipo',
    '$estado'
)";

$resultado = mysqli_query(
    $conexion,
    $sql
);

if($resultado){

    echo json_encode([
        "mensaje" =>
        "Vehículo registrado correctamente"
    ]);

}else{

    echo json_encode([
        "mensaje" =>
        "Error al registrar"
    ]);

}

?>