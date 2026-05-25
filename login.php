<?php

session_start();

$conn = new mysqli("localhost", "root", "", "loja");

$email = $_POST["email"];
$password = $_POST["password"];

$sql = "SELECT * FROM users WHERE email = '$email'";

$result = $conn->query($sql);
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user["password"]) ){
    $_SESSION["user"] = $user ["username"];

    header("Location: index.php");
    exit();
}else{
    echo "Email ou password errados!";
}
?>