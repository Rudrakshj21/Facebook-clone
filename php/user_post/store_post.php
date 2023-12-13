<?php
require_once("../utils/db_connect.php");
require_once("../utils/functions.php");
require_once("../utils/response.php");

if (!isset($_POST['token'])) {
    http_response_code(401);
    response("invalid token");
}

$token = $_POST['token'];

// fetch user id of the current users using their token as it is required for posts table below
$user_id =  get_userid($token)['id'];

$post_content = $_POST['postContent'];
$post_image_url = $_POST['postImageUrl'];

// insert into post db
// echo json_encode([[$post_content, $user_id, $post_image_url]]);

try {
    $pdo = generatePDO();
    // store the post details of the user 
    $query =  $pdo->prepare('INSERT INTO posts (users_id,post_content,post_image_url) VALUES(:userid,:content,:image)');
    $query->bindParam('userid', $user_id);
    $query->bindParam('content', $post_content);
    $query->bindParam('image', $post_image_url);
    $query->execute();
    if ($query->rowCount() != 0) {

        $result = $query->fetch(PDO::FETCH_ASSOC);
        response("inserted post in db successfully", true);
    } else {
        response("cannot insert posts in db");
    }
} catch (Exception $e) {
    response("Error occured while inserting post into db....." . $e->getMessage());
}
