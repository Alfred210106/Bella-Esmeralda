<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;

$sql = "DELETE FROM pasajeros WHERE id = '$id'";

if(mysqli_query($conexion, $sql)){

    echo json_encode([
        "mensaje" => "Pasajero eliminado"
    ]);

}else{

    echo json_encode([
        "mensaje" => "Error al eliminar"
    ]);

}

?>