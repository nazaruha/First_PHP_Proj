<?php
$id = $_GET["id"];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include $_SERVER["DOCUMENT_ROOT"]."/connection_database.php";
    if (isset($dbh)) {
        $sql = "SELECT image FROM users WHERE id = ?";
        $stmt = $dbh->prepare($sql);
        $stmt->execute([$id]);

        $row = $stmt->fetch();

        $imagePath = $_SERVER["DOCUMENT_ROOT"]."/assets/userImages/".$row[0];

        unlink($imagePath);

        $sql = "DELETE FROM users WHERE id = ?;";
        $stmt = $dbh->prepare($sql);
        $stmt->execute([$id]);
//        $dbh.exit();
//        header("Location: /");
//        exit;
    }
}