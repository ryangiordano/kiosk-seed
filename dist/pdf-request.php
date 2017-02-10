<?php
//display any errors when form loads
   ini_set('display_errors',1);
   error_reporting(E_ALL);

//pull variables from html form input
   $name = $_POST["name"];
   $email = $_POST["email"];
   $pdf = $_POST["pdf"];
   $pdfLink = $_POST["pdf-link"];
   if (isset($_POST["subscribe"])){
    $subscribe = "Yes";
    }else{
     $subscribe = "No";
   }
//set email variables for person requesting brochure
   $email_subject = "Information Requested from Civista Bank";
   $message = "<p style='font-family:Arial, sans-serif'>Hello,</p>
   <p style='font-family:Arial, sans-serif'>Here is the link to download or view the information you requested: <strong><a href='$pdfLink'>$pdf</a></strong> </p>
   <p style='font-family:Arial, sans-serif'>Simply click the link to view the PDF, or you may also print or download the file for your records.</a></p>
   <p style='font-family:Arial, sans-serif'>To learn more about our products and services, please <a href='https://www.civistabank.com/'>visit our website.</a></p>
   <p style='font-family:Arial, sans-serif'>Thanks for giving us the opportunity to serve you!</p>
   <p style='font-family:Arial, sans-serif'>&mdash;Your friends at Civista Bank</p>";

   $email_from = 'info@civistabank.com';// Who the email is from
   $email_message = $message;
   $email_to = $email; // Who the email is to // From form input
   $headers = 'From: Civista Bank <info@civistabank.com>'. "\r\n" .
    'Reply-To: info@civistabank.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
//emails will display html styling along with text // formats email headers
   $semi_rand = md5(time());
   $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
   $headers .= "\nMIME-Version: 1.0\n" .
   "Content-Type: multipart/mixed;\n" .
   " boundary=\"{$mime_boundary}\"";

   $email_message .= "This is a multi-part message in MIME format.\n\n" .
   "--{$mime_boundary}\n" .
   "Content-Type:text/html; charset=\"iso-8859-1\"\n" .
   "Content-Transfer-Encoding: 7bit\n\n" .
   $email_message .= "\n\n";

   $headers2 .= "\nMIME-Version: 1.0\n" .
   "Content-Type: multipart/mixed;\n" .
   " boundary=\"{$mime_boundary}\"";

   $body .= "This is a multi-part message in MIME format.\n\n" .
   "--{$mime_boundary}\n" .
   "Content-Type:text/html; charset=\"iso-8859-1\"\n" .
   "Content-Transfer-Encoding: 7bit\n\n" .
   $body .= "\n\n";


//check it over and send
   $ok = mail($email_to, $email_subject, $email_message, $headers);


//display success or fail message page
if($ok) {
 // mail ($to, $subject, $body, $headers2);
 header("Location: ./index.html?status=success");
} else {
header("Location: ./index.html?status=fail");
}
?>
