<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("conexion.php");

$datos = json_decode(file_get_contents("php://input"));

$id = $datos->id;

$sql = "DELETE FROM encomiendas WHERE id='$id'";

if(mysqli_query($conexion, $sql)){

    echo json_encode([
        "mensaje" => "Encomienda eliminada"
    ]);

}else{

    echo json_encode([
        "mensaje" => "Error"
    ]);

}

?>