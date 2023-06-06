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
        <h1 class="text-center">Реєстрація</h1>
        <form method="POST" enctype="multipart/form-data" class="mt-5 col-md-6 offset-md-3">

            <div class="mb-3 row">

                <div class="col-md-6">
                    <label for="firstName" class="form-label" >Ім'я</label>
                    <input type="text" class="form-control" id="firstName"/>
                </div>
                <div class="col-md-6">
                    <label for="secondName" class="form-label">Фамілія</label>
                    <input type="text" class="form-control" id="secondName"/>
                </div>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Пошта</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">Ми не поділимось вашою поштою</div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control" id="password">
            </div>

            <div class="mb-4">
                <label for="number" class="form-label">Телефон</label>
                <input type="text" class="form-control" id="number">
            </div>

            <div class="mb-3">
                <label class="form-label" for="file">
                    Оберіть фотографію
                    <img src="../assets/selectImage.png" id="select-image" class="d-block"/>
                </label>
                <input type="file" id="file" name="file" class="d-none" onchange="selectImage()"/>
            </div>
            <button type="submit" name="submit" class="btn btn-primary">Зареєстуватись</button>
        </form>
    </div>
</main>

<script>
    function selectImage() {
        var img = document.getElementById("select-image");
        var file = document.getElementById("file").files[0];
        var reader = new FileReader();

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
<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>