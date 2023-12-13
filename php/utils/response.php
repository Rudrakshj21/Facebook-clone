<?php

function response($message = "", $status = false, $data = null)
{
    echo json_encode([
        "message" => $message,
        "status" => $status,
        "data" => $data
    ]);
    exit();
}

