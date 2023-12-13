<?php

require_once("db_connect.php");

// sets token field for a user using their password , email
function set_token($token, $password, $email)
{

    try {
        $pdo = generatePDO();
        $query = $pdo->prepare('UPDATE users SET token = :token WHERE password = :password and email = :email');
        $query->bindParam('token', $token);
        $query->bindParam('password', $password);
        $query->bindParam('email', $email);
        $query->execute();
        return true;
    } catch (Exception $e) {
        response("could not set token in db error", $e->getMessage());
    }
}

// for a particular token returns their user id 
function get_userid($token)
{
    try {
        $pdo = generatePDO();
        $query = $pdo->prepare('SELECT id FROM users WHERE token = :token;');
        $query->bindParam('token', $token);
        $query->execute();
        if ($query->rowCount() != 0) {
            $result = $query->fetch(PDO::FETCH_ASSOC);
            return $result;
        }
        response("No user id found");
    } catch (Exception $e) {
        response("could not get user id  from db error", $e->getMessage());
    }
}
