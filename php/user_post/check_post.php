<?php
require_once("../utils/db_connect.php");
require_once("../utils/functions.php");
require_once("../utils/response.php");

$headers = apache_request_headers();

if (!isset($headers['token'])) {
    http_response_code(401);
    response("invalid token");
}

$token = $headers['token'];

// echo json_encode($token);
// exit();
// get user id
$user_id =  get_userid($token)['id'];

try {

    $pdo = generatePDO();
// inner join on user id in users and posts table to get all posts of that user 
    $query = $pdo->prepare('SELECT posts.post_content,posts.post_image_url,posts.created_at,users.first_name,users.last_name ,users.profile_pic_url FROM users inner join posts on users.id = posts.users_id where users.id = :userid');
    $query->bindParam('userid', $user_id);
    $query->execute();

    if ($query->rowCount() != 0) {

        $post_details = $query->fetchAll(PDO::FETCH_ASSOC);

        response("found some posts...", true, $post_details);
    } else {
        response("no posts found......");
    }
} catch (Exception $e) {
    response("Error occured while finding posts...." . $e->getMessage());
}
