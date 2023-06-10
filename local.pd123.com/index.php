<?php include $_SERVER["DOCUMENT_ROOT"] . "/head.php" ?>
    <main>
        <div class="container">
            <h1 class="text-center mt-3">Список користувачів</h1>
            <!--
        <?php // тут пишеться код php
            echo "<h2>Текст через echo</h2>"; // echo -> виводить html на сайт. Інтерпретується в html код
            ?>
        -->
            <a class="btn btn-success mb-3 fs-5" href="/register.php">
                Створити Користувача
                <i class="fa fa-user-plus fs-3" aria-hidden="true"></i>
            </a>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th></th> <!-- delete row -->
                    <th></th> <!-- edit row -->
                </tr>
                </thead>
                <tbody>
                <?php
                include $_SERVER["DOCUMENT_ROOT"] . "/connection_database.php"; // підключились до бази
                if (isset($dbh)) {
                    // use the connection here
                    $stm = $dbh->query('SELECT id, name, surname, email, phone FROM users');

                    // fetch all rows into array, by default PDO::FETCH_BOTH is used
                    $rows = $stm->fetchAll();

                    // iterate over array by index and by name
                    foreach ($rows as $row) {
                        echo "<tr>
                                    <th>$row[0]</th>
                                    <td>$row[1]</td>
                                    <td>$row[2]</td>
                                    <td>$row[3]</td>
                                    <td>$row[4]</td>
                                    <td>
                                        <a href='/editUser.php?id=$row[0]' class='text-warning' data-edit='$row[0]'>
                                            <i class='fa fa-pencil fs-4' aria-hidden=true></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a href='/delete.php?id=$row[0]' class='text-danger' data-delete='$row[0]'>
                                            <i class='fa fa-times fs-4'></i>
                                        </a>
                                    </td>
                                </tr>";
                    }
                }
                ?>
                </tbody>
            </table>
        </div>
    </main>
<?php include $_SERVER["DOCUMENT_ROOT"] . "/modals/deleteModal.php"; ?>

<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/axios.min.js"></script>

<script>
    window.addEventListener("load", (event) => {
        let hrefDelete = ""; // посилання з нашого тега a
        const delBtns = document.querySelectorAll("[data-delete]"); // шукаєм всі кнопочки, які мають data-delete
        const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
        for (i = 0; i < delBtns.length; i++) {
            delBtns[i].onclick =  function(e) {
                e.preventDefault();  // відміняє стандартну поведінку тега <a></a>
                console.log("Ви хочете видалити елемент");
                hrefDelete = this.href; // стягуємо href значення з тега a
                deleteModal.show();
            }
        }
        document.getElementById("modalDeleteYes").onclick=function() {
            axios.post(hrefDelete)
                .then((resp) => {
                    deleteModal.hide(); // ховаєм модалку
                    location.reload(); // перезагружаєм сторінку
                })
        }
    });
</script>
<?php include $_SERVER["DOCUMENT_ROOT"] . "/footer.php" ?>