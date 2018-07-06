<!DOCTYPE html>
<html>
    <?php
        require_once 'controller/MainController.php';
        $MainController = new MainController($dbName, $username, $pass, $serverAdress, $dbType);
        echo $MainController->handleRequest();
    ?>
</html>
