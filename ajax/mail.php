<?php
echo"Сервер доступний";
$name = $_POST['name'];
$namber = $_POST['namber'];
$message = $_POST['text'];

$subject = "=?utf-8?B?".base64_encode("Повідомлення з сайта")."?=";
$headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf8_\r\n";

$success = mail("zeka330@ukr.net", $subject, $message, $headers );
echo $success;

?>