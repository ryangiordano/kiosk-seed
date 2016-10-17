<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

//gather variables from the form
if(isset($_POST['email'])){
  $branch = $_POST["branch"];
  $serviceName = $_POST["serviceName"];
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $time = $_POST["time"];
  $repName = $_POST["repName"];
  $repEmail = $_POST["repEmail"];
  $serviceEmail = $_POST["serviceEmail"];

  $emailArray = array($repEmail, $serviceEmail);

  $repPhone = $_POST["repPhone"];
  $repPictureLink = $_POST["repPictureLink"];
  $repMessage = $_POST["repMessage"];
  $repTitle = $_POST["repTitle"];
  $repCredentials = $_POST["repCredentials"];
  $showDisclosures = $_POST["showDisclosures"];


  //set email variables for person requesting brochures
  $email_subject = "$serviceName Appointment Request for: $name";
  $message = "<p style='font-famil:Arial, sans-serif'>Hello,</p>
  <p style='font-family:Arial, sans-serif'>$name wishes to schedule a discussion with $repName about $serviceName.</p>
  <p style='font-family:Arial, sans-serif'>$name's information is as follows:</p>
  <p style='font-family:Arial, sans-serif'><strong>e-mail address:</strong> $email</p>
  <p style='font-family:Arial, sans-serif'><strong>Their phone number:</strong> $phone</p>
  <p style='font-family:Arial, sans-serif'><strong>The most convenient time for them is:</strong> $time</p><br>";

  $email_from = 'ryancodigo@gmail.com';
  $email_message = $message;
  $email_to = implode(',', $emailArray);
  $headers = 'From: Civista State Bank Kiosk <ryancodigo@gmail.com>'. "\r\n" .
   'Reply-To: ryancodigo@gmail.com' . "\r\n" .
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

     $body = "This is a multi-part message in MIME format.\n\n" .
     "--{$mime_boundary}\n" .
     "Content-Type:text/html; charset=\"iso-8859-1\"\n" .
     "Content-Transfer-Encoding: 7bit\n\n";

        $ok = mail($email_to, $email_subject, $email_message, $headers);

        //display success or fail message page
        //$ok=true;
          if($ok) {
          $result = "Thank You";
          $resultMessage = "An appointment request was successfully sent. A representative will be in contact <br>with you soon.";
          } else {
          $error=true;
          $result = "Error";
          $resultMessage = "There appears to have been an error with your request.  Please contact a staff member to assist you.";
          }
}else{
  $ok = false;
  $error=true;
  $result = "Error";
  $resultMessage = "There appears to have been an error with your request.  Please contact a staff member to assist you.";
}


 ?>
 <?xml version="1.0" encoding="UTF-8"?>
 <!DOCTYPE html>
 <html>

 <head>
     <meta charset="utf-8">
     <title>Civista Bank</title>
     <link rel="stylesheet" href="css/skeleton.css" media="screen" title="no title" charset="utf-8">
     <link rel="stylesheet" href="css/animate.css" media="screen" title="no title" charset="utf-8">
     <link rel="stylesheet" href="css/css.css" media="screen" title="no title" charset="utf-8">
 </head>
<style media="screen">
.spacer{
  padding-top:9em;
}
.response{
  display:flex;
  justify-content:center;
  align-items:center;
  height:400px;
}
.schedule-result  .title h1, .schedule-result .copy p {
    color: #ffffff;
}
.schedule-result .title h1{
  font-size:50px;
}
.schedule-result .copy p{
  font-size:25px;
}
</style>
 <body>
     <div class="sub-page schedule-result">
         <div class="background-grey-gradient">
             <?php  if($ok){ ?>
               <div class="sky-background" id="sky-background">
               </div>
               <div class="container spacer">
                 <div class="row">
                   <div class="columns six">
                     <div class="response">

                           <div><h1 class="title"><?php echo $result ?></h1>


                           <p class="copy">
                               <?php echo $resultMessage ?></p></div>

                     </div>

                   </div>
                   <div class="columns six">
                     <div class="message-box">
                         <!-- If mail was sent -->
                         <div class="contact-card">
                             <div class="image-container" style="background-image:url('<?php echo $repPictureLink ?>')">
                                 <!-- <img src="" alt="" /> -->
                             </div>
                             <div class="information ">
                               <div class="row">
                                 <div class="columns twelve">
                                    <h2><?php echo $repName . ", " . $repTitle ?></h2>
                                    <p style="margin-top:10px;font-weight:bold"><?php echo $repCredentials ?></p>
                                 </div>
                               </div>
                               <div class="row">
                                 <div class="columns one">
                                    <img src="img/phone.svg" alt="" />
                                 </div>
                                 <div class="columns eleven">
                                      <p><?php echo $repPhone ?></p>
                                 </div>
                               </div>
                               <div class="row">
                                 <div class="columns one">
                                 <img src="img/mail.svg" alt="" />
                                 </div>
                                 <div class="columns eleven">
                                 <p><?php echo $repEmail ?></p>
                                 </div>
                               </div>
                             </div>
                         </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="corner-logo">
                   <a href="index.html">
                       <img src="img/logo.svg" />
                   </a>
               </div>
               <?php


               if($showDisclosures === "true"){ ?>
                 <div class="disclosure">
                   <img src="img/fdic.svg" alt="" />
                   <img src="img/equalhousing.svg" alt="" />
                 </div>
               <?php } ?>

             <?php  }else{ ?>
               <div class="sky-background" id="sky-background">
               </div>
               <div class="header">
                   <div class="title">
                       <h1><?php echo $result ?></h1>
                   </div>
                   <div class="copy">
                       <p>
                           <?php echo $resultMessage ?></p>
                   </div>
               </div>
               <div class="corner-logo">
                   <a href="index.html">
                       <img src="img/logo.svg" />
                   </a>
               </div>
           <?php  } ?>
             <!-- If an error occured -->
         </div>
     </div>
 </body>
 <script type="text/javascript" src="js/fastclick.js">
 </script>
 <script type="text/javascript" src="js/jquery-1.11.2.min.js">
 </script>
 <script type="text/javascript" src="js/TweenMax.min.js">
 </script>
 <script type="text/javascript" src="js/jquery.validate.min.js">
 </script>
 <script type="text/javascript" src="js/app.js">
 </script>
 <?php if($ok){ ?>
   <script type="text/javascript">
       // If successful
       (function() {
           var cornerLogo = $('.corner-logo'),
               title = $('.title'),
               copy = $('.copy'),
               cornerLogoImg = $('.corner-log img'),
               skyBackground = $('#sky-background'),
               contactCard = $('.contact-card'),
               img = $('.image-container img'),
               tl = new TimelineMax();

           tl.set(skyBackground, {
               opacity: 0
           });
           tl.set(cornerLogo, {
               opacity: 0,
               y: 200
           });
           tl.set(cornerLogoImg, {
               opacity: 0,
               y: 200
           });
           tl.set(img, {
               opacity: 0,
               scale: .1
           });
           tl.set(contactCard, {
               y: 500,
               rotationY: '91',
               opacity: 0
           });
           tl.set(copy, {
               y: 500,
               opacity: 0
           });
           tl.set(title, {
               y: 500,
               opacity: 0
           });

           tl.staggerTo([cornerLogo, cornerLogoImg], .5, {
               opacity: 1,
               y: 0
           }, .01)

           .to(skyBackground, 2, {
                   opacity: 1,
                   delay: 0
               }, "card")
               .staggerTo([title, copy], .5, {
                   y: 0,
                   opacity: 1
               }, .1, "card")
               .to(contactCard, .5, {
                   y: 0,
                   opacity: 1,
                   delay: .5
               }, "card")
               .to(contactCard, 1, {
                   rotationY: '0',
                   delay: .9
               }, "card")
               .to(img, .5, {
                   opacity: 1,
                   scale: 1,
                   delay: 1.2
               }, "card");

       })();
   </script>
 <?php }else{ ?>
   <script type="text/javascript">
       // If error
       (function() {
           var cornerLogo = $('.corner-logo'),
               cornerLogoImg = $('.corner-logo img'),
               title = $('.title h1'),
               intro = $('#intro'),
               copy = $('.copy p'),
               tl = new TimelineMax();

           tl.set(cornerLogo, {
               opacity: 0,
               y: 200
           });
           tl.set(cornerLogoImg, {
               opacity: 0,
               y: 200
           });
           tl.set(copy, {
               y: 500,
               opacity: 0,
               color: "#e03006"
           });
           tl.set(title, {
               y: 500,
               opacity: 0,
               color: "#e03006"
           });
           tl.set(intro, {
               y: 500,
               opacity: 0,
               color: "#e03006"
           });

           tl.staggerTo([cornerLogo, cornerLogoImg], .5, {
               opacity: 1,
               y: 0
           }, .01)

               .staggerTo([title, copy, intro], .5, {
                   y: 170,
                   opacity: 1
               }, .1, "card")

       })();
   </script>

 <?php }?>


 </html>
