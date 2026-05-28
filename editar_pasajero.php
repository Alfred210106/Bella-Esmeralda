<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT");

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;

$nombre = $data->nombre;
$dni = $data->dni;
$destino = $data->destino;
$asiento = $data->asiento;
$fecha = $data->fecha;

$sql = "UPDATE pasajeros SET

nombre='$nombre',
dni='$dni',
destino='$destino',
asiento='$asiento',
fecha='$fecha'

WHERE id='$id'";

$resultado = mysqli_query($conexion, $sql);

if($resultado){

    echo json_encode([
        "mensaje" => "Pasajero actualizado correctamente"
    ]);

}else{

    echo json_encode([
        "mensaje" => "Error al actualizar"
    ]);

}

?>