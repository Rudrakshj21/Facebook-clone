<?php

require_once("./utils/db_connect.php");
require_once("./utils/response.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(401);
    response("ONLY POST METHOD ACCEPTED");
}

$first_name = $_POST['first-name'];
$last_name = $_POST['last-name'];
$phone_number = $_POST['phone-number'];
$date_of_birth = $_POST['date-of-birth'];
$sign_up_email = $_POST['sign-up-email'];
$sign_up_password = $_POST['sign-up-password'];

// response([$first_name, $last_name, $phone_number, $date_of_birth, $sign_up_email, $sign_up_password]);
if (empty($first_name) || empty($last_name) || empty($phone_number) || empty($date_of_birth) || empty($sign_up_email) || empty($sign_up_password)) {

    response("one or more field is empty");
}
// hash password
$sign_up_password = md5($sign_up_password);

try {
    $pdo = generatePDO();
    // returns statement object
    $query = $pdo->prepare("INSERT INTO users (email,password,first_name,last_name,dob)VALUES(:email,:password,:first_name,:last_name,:dob)"); // dont forget )
    $query->bindParam("email", $sign_up_email);
    $query->bindParam("password", $sign_up_password);
    $query->bindParam("first_name", $first_name);
    $query->bindParam("last_name", $last_name);
    $query->bindParam("dob", $date_of_birth);
    $query->execute();

    response("inserted values successfully", true);
} catch (Exception $e) {

    response("Something went wrong while inserting into database" . $e->getMessage());
}
