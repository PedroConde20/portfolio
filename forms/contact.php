<?php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);

  if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {

      $name    = strip_tags(trim($_POST['name']));
      $email   = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
      $subject = strip_tags(trim($_POST['subject']));
      $message = trim($_POST['message']);

      if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "Error: Todos los campos son obligatorios.";
        exit;
      }

      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Error: El correo electrónico no tiene un formato válido.";
        exit;
      }

      $to = 'condevaldezpedro@gmail.com'; // Tu correo de recepción
      $email_subject = "Nuevo mensaje de $name: $subject";
      $email_body  = "Has recibido un nuevo mensaje desde el formulario de contacto:\n\n";
      $email_body .= "Nombre: $name\n";
      $email_body .= "Email: $email\n";
      $email_body .= "Asunto: $subject\n";
      $email_body .= "Mensaje:\n$message\n";

      $headers  = "From: $name <$email>\r\n";
      $headers .= "Reply-To: $email\r\n";


      if (mail($to, $email_subject, $email_body, $headers)) {
        echo "OK";
      } else {
        echo "Error: El mensaje no pudo ser enviado.";
      }

    } else {
      echo "Error: Faltan campos en el formulario.";
    }
  } else {
    echo "Error: Método de envío no permitido.";
  }
?>
