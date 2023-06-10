<?php
require_once "config.php"; // connect config file

try {
    // Підключення до Бази Даних з параметрами, які створили в config.php (DB_DRIVERm DB_HOST etc...)
    //$dbh = new PDO('mysql:host=localhost;dbname=pd123', "root", "");
    $dbh = new PDO(DB_DRIVER . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD,
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET)); // подключаєм кодіровку данних
} catch (PDOException $e) {
    print "Error Connection to DB!: " . $e->getMessage() . "<br/>";
    die();
}