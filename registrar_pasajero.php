<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

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

// Capturamos los campos reales que tiene tu tabla 'pasajeros'
$nombre = $data->nombre;
$dni = $data->dni;
$viaje_id = intval($data->viaje_id); 
$asiento = $data->asiento;
$fecha = date('Y-m-d'); // Asignamos la fecha del día actual para cumplir con la base de datos

// La consulta SQL ahora apunta exactamente a las columnas de tu BD (id, nombre, dni, viaje_id, asiento, fecha)
$sql = "INSERT INTO pasajeros (nombre, dni, viaje_id, asiento, fecha) 
        VALUES ('$nombre', '$dni', $viaje_id, '$asiento', '$fecha')";

$resultado = mysqli_query($conexion, $sql);

if($resultado){
    echo json_encode([
        "mensaje" => "Pasajero registrado correctamente"
    ]);
}else{
    echo json_encode([
        "mensaje" => "Error al registrar: " . mysqli_error($conexion)
    ]);
}
?>