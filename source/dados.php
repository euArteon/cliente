<?php 
    header('Content-type: application/json');
    $_GET['name'];
    $_GET['cpf'];
    $_GET['email'];
    $_GET['phone'];
    $_GET['rua'];
    $_GET['number'];
    $_GET['bairro'];
    $_GET['complemento'];
    $_GET['cidade'];
    $_GET['estado'];
    $_GET['cep'];

    $name = $_GET['name'];
    $cpf = $_GET['cpf'];
    $email = $_GET['email'];
    $phone = $_GET['phone'];
    $rua = $_GET['rua'];
    $number = $_GET['number'];
    $bairro = $_GET['bairro'];
    $complemento = $_GET['complemento'];
    $cidade = $_GET['cidade'];
    $estado = $_GET['estado'];
    $cep = $_GET['cep'];
    $date = date('d/m/Y');

    require('./email/vendor/autoload.php');
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    $email_file = file_get_contents('./email/dados.html');

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
        $mail->setFrom('contato@deatly.com', 'Deatly - Atendimento');
        $mail->addAddress($email, $name);     // Add a recipient
        $email_file = str_replace('%user%', ucfirst($name), $email_file);
        $email_file = str_replace('%number%', ucfirst($number), $email_file);
        $email_file = str_replace('%bairro%', ucfirst($bairro), $email_file);
        $email_file = str_replace('%complemento%', ucfirst($complemento), $email_file);
        $email_file = str_replace('%cidade%', ucfirst($cidade), $email_file);
        $email_file = str_replace('%estado%', ucfirst($estado), $email_file);
        $email_file = str_replace('%cep%', ucfirst($cep), $email_file);
        $email_file = str_replace('%name%', ucfirst($name), $email_file);
        $email_file = str_replace('%cpf%', ucfirst($cpf), $email_file);
        $email_file = str_replace('%phone%', ucfirst($phone), $email_file);
        $email_file = str_replace('%email%', ucfirst($email), $email_file);

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Solicitação de Dados de Cadastro';
        $mail->Body    = $email_file;
        $mail->AltBody = 'Agradecemos o seu contato.';

       /*  $mail->send(); */
        echo 'true';
    } catch (Exception $e) {
        echo $mail->ErrorInfo;
    }
?>