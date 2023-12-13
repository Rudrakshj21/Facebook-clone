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
    $query = $pdo->prepare("SELECT profile_pic_url FROM users WHERE profile_pic_url IS NOT NULL and token = :token");
    $query->bindParam('token', $token);
    $query->execute();

    if ($query->rowCount() > 0) {
        $profile_pic_url =  $query->fetch(PDO::FETCH_ASSOC);
        // http_response_code(201);
        response("found profile pic", true, $profile_pic_url);
    } else {
        // resource not found response code
        response("not found profile pic", false);
        http_response_code(404);
    }
} catch (Exception $e) {
    response("db error", false, $e->getMessage());
}
