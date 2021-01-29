<?php 
    $document = $_GET['document'];
    header('Content-type: application/json');
    require('./STqNGs0njZ.php');
    try{
        $pdo = new PDO('mysql:host='.UVjWWW.';dbname='.UBFGa6weQD,tmtyOVnU,iTrvTqZUeT);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }catch(Exception $e){
        echo 'Não foi possível realizar a conexão com o banco de dados';    
    }
    $pdo_query = $pdo->prepare("SELECT * FROM `orders` INNER JOIN `products` ON orders.document = $document AND orders.product_id = products.id");
    $pdo_query->execute();
    $compras = $pdo_query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($compras);
?>
