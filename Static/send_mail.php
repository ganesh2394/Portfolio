<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Load Composer's autoloader
    require __DIR__ . '/../PHPMailer/PHPMailer.php';
    require __DIR__ . '/../PHPMailer/SMTP.php';
    require __DIR__ . '/../PHPMailer/Exception.php';

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'gp2581739@gmail.com';                     //SMTP username
        $mail->Password   = 'kqxh uaus jciz pjyx';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to

        //Recipients
        $mail->setFrom('gp2581739@gmail.com', 'Contact Form');
        $mail->addAddress('amit@gmail.com', 'Recipient Name');     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Contact Form Submission';
        $mail->Body    = "Name: $name <br>Email: $email <br>Message: $message";

        $mail->send();
        
        // Send a success response
        echo json_encode(['status' => 'success', 'message' => 'Your message has been sent successfully!']);
    } catch (Exception $e) {
        // Send an error response
        echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    // Send an invalid request method response
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
