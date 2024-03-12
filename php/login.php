<?php
require_once("./utils/response.php");
require_once("./utils/db_connect.php");
require_once("./utils/functions.php");
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(401);
    response("ONLY POST REQUEST ACCEPTED");
}

$email = $_POST['email'];
$retrieved_password = $_POST['password'];
if (empty($email) || empty($retrieved_password)) {
    response(
        'one or more fields is empty'
    );
}
$retrieved_password = md5($retrieved_password);


try {
    $pdo = generatePDO();
    $query = $pdo->prepare("SELECT * from users WHERE email = :email AND password = :password");
    $query->bindParam('email', $email);
    $query->bindParam('password', $retrieved_password);
    $query->execute();
    if ($query->rowCount() == 1) {
        $result = $query->fetch(PDO::FETCH_ASSOC);
        // generate token
        $token = uniqid();
        //  set token in database
        $token_set =  set_token($token, $retrieved_password, $email);
        if ($token_set) {
            response("user can login..token set in db", true, $token);
        } else {
            response(" setting token failed");
        }
    } else {
        response("cannot login....");
    }
} catch (Exception $e) {
    response("db error.." . $e->getMessage());
}
