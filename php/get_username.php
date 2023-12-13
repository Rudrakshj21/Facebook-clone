<?php
require_once("./utils/db_connect.php");
require_once("./utils/functions.php");
require_once("./utils/response.php");
$headers = apache_request_headers();

if (!isset($headers['token'])) {
    http_response_code(401);
    response("invalid token");
}
$token = $headers['token'];

try {

    $pdo = generatePDO();
    $query = $pdo->prepare("SELECT CONCAT(first_name,' ',last_name) AS full_name FROM users WHERE  token = :token");
    $query->bindParam('token', $token);
    $query->execute();

    if ($query->rowCount() > 0) {
        $full_name =  $query->fetch(PDO::FETCH_ASSOC);
        // http_response_code(201);
        response("found user name ", true, $full_name);
    } else {
        // resource not found response code
        response("not found user name ", false);
        http_response_code(404);
    }
} catch (Exception $e) {
    response("db error", false, $e->getMessage());
}
