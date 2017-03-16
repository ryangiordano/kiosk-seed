<?php
//display any errors when form loads
   ini_set('display_errors',1);
   error_reporting(E_ALL);
//pull variables from html form input
   $email = $_POST["email"];
   $pdf = $_POST["brochure-name"];
   $pdfLink = $_POST["brochure-link"];
   require $_SERVER['DOCUMENT_ROOT'] . '/libraries/class.phpmailer.php';
   require $_SERVER['DOCUMENT_ROOT'] . '/libraries/class.smtp.php';
//set email variables for person requesting brochure
   $email_subject = "Information Requested from -------";
   $message = "<p style='font-family:Arial, sans-serif'>Hello,</p>
   <p style='font-family:Arial, sans-serif'>Here is the link to download or view the information you requested: <strong><a href='$pdfLink'>$pdf</a></strong> </p>
   <p style='font-family:Arial, sans-serif'>Simply click the link to view the PDF, or you may also print or download the file for your records.</a></p>
   <p style='font-family:Arial, sans-serif'>To learn more about our products and services, please <a href='---------'>visit our website.</a></p>
   <p style='font-family:Arial, sans-serif'>Thanks for giving us the opportunity to serve you!</p>
   <p style='font-family:Arial, sans-serif'>&mdash;Your friends at ---------------</p>
   <img src='cid:logo' height='100px' width='100px' style='display:block' alt='-----' title='-----'>";

   $email_from = '------';// Who the email is from
   $email_message = $message;
   $email_to = $email; // Who the email is to // From form input

//emails will display html styling along with text // formats email headers
   // To send HTML mail, the Content-type header must be set
   $headers  = 'MIME-Version: 1.0' . "\r\n";
   $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
   $headers .= 'From: -----------'. "\r\n" .
    'Reply-To: --------------' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

//check it over and send
    $mail = new PHPMailer;
    $mail->setFrom($email_from);
    $mail->addAddress($email_to);
    $mail->addReplyTo("--------");
    $mail->isHTML(true);
    $mail->AddEmbeddedImage('img/png-logo.png','logo');

    $mail->Subject = $email_subject;
    $mail->Body = $message;


// //display success or fail message page
if(!$mail->send()) {
 // mail ($to, $subject, $body, $headers2);
header("Location: ./index.html?status=fail");
} else {
   header("Location: ./index.html?status=success");
}
?>
