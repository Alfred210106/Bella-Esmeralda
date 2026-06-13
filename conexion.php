<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servidor = "localhost";
$usuario = "root";
$password = "";
$baseDatos = "bella_esmeralda";

$conexion = mysqli_connect($servidor, $usuario, $password, $baseDatos);

if (!$conexion) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}
?>