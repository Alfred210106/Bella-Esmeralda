<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, OPTIONS");

// Responder con éxito a las peticiones de control de Angular (CORS Preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["mensaje" => "No se recibieron datos"]);
    exit();
}

$id = $data->id;
$nombre = $data->nombre;
$dni = $data->dni;
$viaje_id = intval($data->viaje_id); 
$asiento = $data->asiento;
$tipo_unidad = $data->tipo_unidad; // Nueva columna capturada
$precio_pasaje = floatval($data->precio_pasaje); // Nueva columna capturada

// Se actualizan todas las columnas incluyendo vehículo y precio sin tocar la fecha de creación
$sql = "UPDATE pasajeros SET 
        nombre='$nombre', 
        dni='$dni', 
        viaje_id=$viaje_id, 
        asiento='$asiento',
        tipo_unidad='$tipo_unidad',
        precio_pasaje=$precio_pasaje
        WHERE id='$id'";

$resultado = mysqli_query($conexion, $sql);

if($resultado){
    echo json_encode([
        "mensaje" => "Pasajero actualizado correctamente"
    ]);
}else{
    echo json_encode([
        "mensaje" => "Error al actualizar: " . mysqli_error($conexion)
    ]);
}

?>