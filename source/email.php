<?php 
    header('Content-type: application/json');
    $_GET['email'];
    $_GET['assunto'];
    $_GET['name'];
    $_GET['body'];

    $email = $_GET['email'];
    $assunto = $_GET['assunto'];
    $name = $_GET['name'];
    $body = $_GET['body'];
    $date = date('d/m/Y');

    require('./email/vendor/autoload.php');
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'deatly.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'contato@deatly.com';                     // SMTP username
        $mail->Password   = 'WQpx,t8*Z7(e';                               // SMTP password
        $mail->SMTPSecure = 'ssl'; 
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => true,
                'verify_peer_name' => true,
                'allow_self_signed' => true
            )
        );         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        //Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('contato@deatly.com', 'Deatly - Atendimento');     // Add a recipient

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = '['.$assunto.'] - ['.$date.']';
        $mail->Body    = $body;
        $mail->AltBody = 'Agradecemos o seu contato.';

       /*  $mail->send(); */
        echo 'true';
    } catch (Exception $e) {
        echo $mail->ErrorInfo;
    }
?>