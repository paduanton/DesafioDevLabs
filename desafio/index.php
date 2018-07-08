<?php


include_once 'config.php';

try {
    $PDO = new PDO('mysql:host=' . DB_HOST. ';dbnodsadme=' . DB_NOME, DB_USUARIO, DB_SENHA);
} catch (PDOException $e) {
    echo 'Erro ao conectar com o MySQL: ' . $e->getMessage();
}