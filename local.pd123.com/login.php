<?php
$email = "";
$password = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["email"])) {
        $email = $_POST["email"];
    }
    if (isset($_POST["password"])) {
        $password = $_POST["password"];
    }
    if (!empty($email) && !empty($password)) {
        try {
            $dbh = new PDO('mysql:host=localhost;dbname=pd123', "root", "");
            $sql = "SELECT * FROM users WHERE email=? AND password=?";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([$email, $password]);
            $dbh = null;
            header('Location: /'); // перехід на головну сторінку
            exit;
        } catch (PDOException $e) {
            print "Error Login!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/site.css">
</head>
<body>
<?php
include $_SERVER["DOCUMENT_ROOT"]."/header.php";
?>
<main class="mt-3">
    <div class="container">
        <h1 class="text-center">Вхід</h1>
        <form method="POST" class=" mt-5 col-md-6 offset-md-3 needs-validation" novalidate>
            <div class="mb-3">
                <label for="email" class="form-label">Пошта</label>
                <div class="input-group has-validation">
                    <input type="email" class="form-control" id="email" name="email" value="<?php echo $email?>" required>
                    <div class="invalid-feedback">
                        Вкажіть Пошту
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <div class="input-group has-validation">
                    <input type="password" class="form-control" id="password" name="password" value="<?php echo $password?>" required>
                    <div class="invalid-feedback">
                        Вкажіть пароль
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Увійти</button>
        </form>
    </div>
</main>
<script src="../js/bootstrap-validation.js"></script>
<script src="../js/bootstrap.bundle.min.js"></script>
</body>
</html>