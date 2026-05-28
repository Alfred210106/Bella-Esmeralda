<?php

$servidor = "localhost";
$usuario = "root";
$password = "";
$baseDatos = "bella_esmeralda";

$conexion = mysqli_connect(
    $servidor,
    $usuario,
    $password,
    $baseDatos
);

if(!$conexion){

    die("Error de conexión");

}

?>