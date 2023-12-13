<?php

function generatePDO()
{
    $username = "postgres";
    $password = "root";
    $host = "localhost";
    $db_name = "facebook";

    $dsn = "pgsql:host=$host;dbname=$db_name";
    try {
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $pdo;
    } catch (Exception $e) {
        echo "database connection failed ❌ ";
        echo $e->getMessage();
        return false;
    }
}
