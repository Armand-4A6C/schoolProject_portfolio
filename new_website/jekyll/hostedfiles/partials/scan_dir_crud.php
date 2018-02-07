<?php

function scannedDir($startUrl) {
    // $files  = scandir($startUrl , 0);
    $files = array_values( array_diff( scandir($startUrl), array('..', '.')));

    return $files;
}

?>
