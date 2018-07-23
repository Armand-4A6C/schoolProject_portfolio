<!DOCTYPE html>
<html>
    <?php
        require_once 'controller/EntryController.php';
        $MainController = new EntryController(NULL, NULL, NULL, NULL, NULL);
        echo $MainController->HandleRequest();
    ?>
</html>
