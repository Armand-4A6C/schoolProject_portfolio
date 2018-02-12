<?php

if (isset($_GET["mode"]) ) {
    if (isset($_GET["url"]) && ($_GET["mode"] === "readDir" || $_GET["mode"] === 0) ) {
        include_once "php_partials/scan_dir_crud.php";
        $return = scannedDir("../files/" . $_GET["url"]);
    }
}








if (isset($return)){
    echo json_encode($return);
} else {
    echo false;
}

?>
