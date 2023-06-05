<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Мій сайт PHP</title>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/site.css">
</head>
<body>
    <?php
        include $_SERVER["DOCUMENT_ROOT"]."/header.php";
    ?>
    <main>
        <div class="container">
            <h1>Привіт PHP</h1>
            <?php // тут пишеться код php
                echo "<h2>Текст через echo</h2>"; // echo -> виводить html на сайт. Інтерпретується в html код
            ?>
        </div>
    </main>

    <script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>