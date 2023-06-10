<?php
$id = $_GET["id"];
if (isset($id)) {
    include $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";
    if (isset($dbh)) {
        $sql = "SELECT id, name, surname, phone, email, password, image  FROM users WHERE id = ?";
        $stmt = $dbh->prepare($sql);
        $stmt->execute([$id]);

        $user = $stmt->fetch();

        $name = "";
        $surname = "";
        $email = "";
        $phone = "";

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($_POST["name"]))
                $name = $_POST["name"];
            if (isset($_POST["surname"]))
                $surname = $_POST["surname"];
            if (isset($_POST["email"]))
                $email = $_POST["email"];
            if (isset($_POST["phone"]))
                $phone = $_POST["phone"];

            if (!empty($name) && !empty($surname) && !empty($email)) {
                $sql = "UPDATE users SET name=?, surname=?, phone=?, email=? WHERE id = ?";
                $stmt = $dbh->prepare($sql);
                $stmt->execute([$name, $surname, $phone, $email, $user[0]]);
                $dbh = null;
                header('Location: /');
            }
            exit;
        }
    }
}
?>

<?php include $_SERVER["DOCUMENT_ROOT"] . "/head.php"; ?>
<main class="mt-3">
    <div class="container">
        <h1 class="text-center">Редагування Користувача</h1>
        <?php
        $id = $_GET["id"];
        if (isset($id)) {
            include $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php";
            if (isset($dbh)) {
                $sql = "SELECT id, name, surname, phone, email, password, image  FROM users WHERE id = ?";
                $stmt = $dbh->prepare($sql);
                $stmt->execute([$id]);

                $user = $stmt->fetch();
                echo "
                    <form 
                        method='POST' 
                        enctype='multipart/form-data' 
                        class='mt-5 col-md-6 offset-md-3 needs-validation'
                        style='border: 1px solid black; border-radius: 5px; padding: 10px 20px;' 
                        novalidate
                    >
                        <!-- Ім'я та Фамілія -->
                        <div class='mb-3 row'>
                            <!-- Ім'я -->
                            <div class='col-md-6'>
                                <label for='name' class='form-label'>Ім'я</label>
                                <div class='input-group has-validation'>
                                    <input type='text' name='name' id='name' class='form-control' value='$user[1]' required/>
                                    <div class='invalid-feedback'>
                                         Вкажіть Ім'я
                                    </div>
                                </div>
                            </div>
                            <!-- Фамілія -->
                            <div class='col-md-6'>
                                <label for='surname' class='form-label'>Фамілія</label>
                                <div class='input-group has-validation'> 
                                    <input type='text' name='surname' id='surname' class='form-control' value='$user[2]' required/>
                                    <div class='invalid-feedback'>
                                        Вкажіть Фамілію 
                                    </div>
                                </div> 
                            </div>
                            <div>
                            
                            </div>
                        </div>
  
                        <!-- Пошта -->
                        <div class='mb-3'> 
                            <label for='email' class='form-label'>Пошта</label>
                            <input type='email' name='email' id='email' class='form-control' value='$user[4]' aria-describedby='emailHelp' required/>
                            <div id='emailHelp' class='form-text'>Ми не поділимоь вашою поштою</div>
                            <div id='email-feedback' class='invalid-feedback'> 
                                Вкажіть Пошту
                            </div>
                        </div>
                        
                        <!-- Телефон -->
                        <div class='mb-3'>
                            <label for='phone' class='form-label'>Телефон</label>
                            <input type='text' id='phone' name='phone' class='form-control' value='$user[3]'/> 
                        </div>
                        
                        <div class='row '>
                            <div class='col-md-6 d-flex justify-content-center'> 
                                <button type='submit' name='submit' class='btn btn-primary w-75 fs-5'>Зберегти зміни</button>
                            </div>
                            <div class='col-md-6 d-flex justify-content-center'>
                                <a href='/' class='btn btn-warning w-75 fs-5'>Відмінити</a> 
                            </div>
                        </div>
                    </form>
            ";
            }
        }
        ?>
    </div>
</main>

<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/bootstrap-validation.js"></script>
<?php include $_SERVER["DOCUMENT_ROOT"] . "/footer.php"; ?>
