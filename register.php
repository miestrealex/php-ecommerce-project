<?php 

$conn = new mysqli("localhost", "root", "", "loja");

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users(username, email, password) VALUES ('$username', '$email', '$hashedPassword')";

if ($conn->query($sql)) {
    echo "Conta criada com sucesso";
} else {
    echo "Erro ao criar conta";
}

?>