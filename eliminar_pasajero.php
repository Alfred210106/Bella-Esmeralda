<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion.php';

// Captura el ID si viene por URL (?id=X) o por el cuerpo de la petición
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data->id)) {
        $id = intval($data->id);
    }
}

if ($id > 0) {
    $sql = "DELETE FROM pasajeros WHERE id = $id";
    
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["mensaje" => "Pasajero eliminado correctamente"]);
    } else {
        echo json_encode(["mensaje" => "Error al eliminar: " . mysqli_error($conexion)]);
    }
} else {
    echo json_encode(["mensaje" => "ID de pasajero no válido o ausente"]);
}

?>