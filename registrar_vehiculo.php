<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

if(!$data || !isset($data->placa)){
    exit;
}

$placa = $data->placa;
$modelo = $data->modelo;
$capacidad = $data->capacidad;
// CORRECCIÓN: Se lee 'tipo_unidad' que es lo que envía Angular desde vehiculos.ts
$tipo = isset($data->tipo_unidad) ? $data->tipo_unidad : ''; 
$estado = $data->estado;

// Asignación temporal para la columna obligatoria 'conductor' en MySQL
$conductor = 'Sin asignar';

if($placa == "" || $modelo == "" || $capacidad == "" || $tipo == "" || $estado == ""){
    echo json_encode(["mensaje" => "Campos vacíos"]);
    exit;
}

// Se inserta utilizando las columnas reales de tu base de datos
$sql = "INSERT INTO vehiculos (placa, tipo_unidad, modelo, capacidad, conductor, estado) 
        VALUES ('$placa', '$tipo', '$modelo', '$capacidad', '$conductor', '$estado')";

$resultado = mysqli_query($conexion, $sql);

if($resultado){
    echo json_encode([
        "mensaje" => "Vehículo registrado correctamente"
    ]);
}else{
    echo json_encode([
        "mensaje" => "Error al registrar en BD: " . mysqli_error($conexion)
    ]);
}

?>