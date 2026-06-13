<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE");

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;

$sql = "DELETE FROM viajes WHERE id='$id'";

$resultado = mysqli_query($conexion, $sql);

if($resultado){

    echo json_encode([
        "mensaje" => "Viaje eliminado correctamente"
    ]);

}else{

    echo json_encode([
        "mensaje" => "Error al eliminar"
    ]);

}

?>