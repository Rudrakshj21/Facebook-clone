<?php
require_once("./utils/db_connect.php");
require_once("./utils/functions.php");
require_once("./utils/response.php");

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    response(
        "illegal access"
    );
}


$url = $_POST['image'];
$token = $_POST['token'];
if (empty($url) || empty($token)) {
    response("something went wrong....");
}





try {

    $pdo = generatePDO();
    $query = $pdo->prepare('UPDATE users SET profile_pic_url = :url WHERE token = :token');
    $query->bindParam('url', $url);
    $query->bindParam('token', $token);
    $query->execute();  

    response("profile pic set", true);
} catch (Exception $e) {
    response("not set profile pic error", false, $e->getMessage());
}
