<?php
$name = "";
$surname = "";
$email = "";
$phone = "";
$password = "";
$file = [];
$fileName = "";
$fileNameNew = ""; // new name which will be in the db;
$fileTmpName = "";
$fileSize = "";
$fileError = "";
$fileType = "";
if($_SERVER["REQUEST_METHOD"]==="POST") {
    echo "<br/><br/><br/> POST METHOD";
    if(isset($_POST["name"])) // перевіряє присутність змінної в масиві
        $name = $_POST["name"]; // супер глобальний масив, який зберігає значення полів форми
    if (isset($_POST["surname"]))
        $surname = $_POST["surname"];
    if(isset($_POST["email"]))
        $email = $_POST["email"];
    if(isset($_POST["password"]))
        $password = $_POST["password"];
    if (isset($_POST["phone"]))
        $phone = $_POST["phone"];
    //IMAGE ERROR WORK
    if (isset($_FILES["file"])) {
        $file = $_FILES["file"];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name']; // file location
        $fileSize = $file['size'];
        $fileError = $file['error'];
        $fileType = $file['type'];
        echo "<br/><br/><br/>$fileName<br/>$fileTmpName<br/>$fileSize<br/>$fileError<br/>$fileType";

        $fileExt = explode('.', $fileName);
        $fileActualExt = strtolower($fileExt[1]); // end($fileExt)
        echo "<br/> actExt -> $fileActualExt";

        $allowedExt = array('jpg', 'jpeg', 'png', 'gif');

        if (!in_array($fileActualExt, $allowedExt)) {
            // Wrong file extension
            // make image red border
            die();
        }
        if ($fileError !== 0) {
            // There was an error uploading your file;
            die();
        }

        $fileNameNew = uniqid().'.'.$fileActualExt; // get type format in seconds from actual time + . + file extension
        $fileDestination = __DIR__ . '\\assets\\userImages\\' . $fileNameNew;

        define ('SITE_ROOT', realpath(dirname(__FILE__)));
        move_uploaded_file($fileTmpName, $fileDestination);
    }

    if(!empty($name) && !empty($surname) && !empty($email) && !empty($password) && count($file) > 0) {
        try {
            // Підключення до Бази Даних
            include("connection_database.php");
            if (isset($dbh)) {
                // Створює запит до БД
                $sql = "INSERT INTO users (name, surname, email, password, phone, image) VALUES(?, ?, ?, ?, ?, ?);";
                $stmt = $dbh->prepare($sql); // створити параметризований запит
                $stmt->execute([$name, $surname, $email, $password, $phone, $fileNameNew]);
                $dbh = null;
                header('Location: /'); // перехід на головну сторінку
            }
            exit;
        } catch (PDOException $e) {
            print "Error Register!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}
?>

<?php include $_SERVER["DOCUMENT_ROOT"]."/head.php"; ?>
<main class="mt-3">
    <div class="container">
        <h1 class="text-center">Реєстрація</h1>
        <form method="POST" enctype="multipart/form-data" class="mt-5 col-md-6 offset-md-3 needs-validation" novalidate>

            <!-- Ім'я та Фамілія  -->
            <div class="mb-3 row">
                <div class="col-md-6">
                    <label for="name" class="form-label" >Ім'я</label>
                    <div class="input-group has-validation">
                        <input
                                type="text"
                                class="form-control"
                                id="name"
                                name="name"
                                value="<?php echo $name; ?>"
                                required
                        />
                        <div class="invalid-feedback">
                            Вкажіть Ім'я
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="surname" class="form-label" >Ім'я</label>
                    <input
                        type="text"
                        class="form-control"
                        id="surname"
                        name="surname"
                        value="<?php echo $surname; ?>"
                        required
                    />
                    <div class="invalid-feedback">
                        Вкажіть Фамілію
                    </div>
                </div>
            </div>

            <!-- Пошта -->
            <div class="mb-3">
                <label for="email" class="form-label">Пошта</label>
                <input
                    type="email"
                    class="form-control"
                    id="email" name="email"
                    value="<?php echo $email; ?>"
                    aria-describedby="emailHelp"
                    required
                >
                <div id="emailHelp" class="form-text">Ми не поділимось вашою поштою</div>
                <div class="invalid-feedback">
                    Вкажіть Пошту
                </div>
            </div>

            <!-- Телефон -->
            <div class="mb-3">
                <label for="phone" class="form-label">Телефон</label>
                <input
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    value="<?php echo $phone; ?>"
                >
            </div>

            <!-- Пароль -->
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    required
                >
                <div class="invalid-feedback">
                    Вкажіть пароль
                </div>
            </div>

            <!-- Фотографія -->
            <div class="mb-3">
                <label class="form-label" for="file">
                    Оберіть фотографію
                    <img src="assets/selectImage.png" id="select-image" class="d-block"/>
                </label>
                <input type="file" id="file" name="file" class="d-none" onchange="selectImage()" required/>
                <div class="invalid-feedback">
                    Вкажіть Фотографію
                </div>
            </div>
            <button type="submit" name="submit" class="btn btn-primary">Зареєстуватись</button>
        </form>
    </div>
</main>

<script>
    function selectImage() {
        let img = document.getElementById("select-image");
        let file = document.getElementById("file").files[0];
        let reader = new FileReader();

        reader.onloadend = function() {
            img.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file)
        } else {
            img.src = "../assets/selectImage.png"
        }
    }
</script>
<script src="js/bootstrap-validation.js"></script>
<?php include $_SERVER["DOCUMENT_ROOT"]."/footer.php" ?>