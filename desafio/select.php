<?php
include("conecta.php");

$sql = "SELECT `nome_func`, `sobrenome_func` FROM `funcionarios` GROUP BY nome_func,sobrenome_func ORDER BY nome_func ASC;";

$select = $PDO->query($sql);

header('Content-type: text/html; charset=ISO-8859-1');


while ($resultado = $select->fetch(PDO::FETCH_OBJ)) {
    echo "Nome: " . $resultado->nome_func . " " . $resultado->sobrenome_func . "</br>";
}