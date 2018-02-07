<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hosted Files</title>
    </head>
    <body>
        <?php
        require_once('partials/scan_dir_crud.php');
        require_once('partials/array_to_select_v0.9.php');

        $startDir = "files";
        $currentDir = ["programming2018", "ass003", "css"];
        $myFiles =  scannedDir("$startDir");
        $newSelect = generateHtmlSelectFromArray($myFiles, "first-select");
        echo $newSelect;

        if (isset($currentDir[0])) {
            $myFiles =  scannedDir($startDir . "/" . $currentDir[0]);
            $newSelect2 = generateHtmlSelectFromArray($myFiles, "second-select");
            echo $newSelect2;
        }

        if (isset($currentDir[1])) {
            $myFiles =  scannedDir($startDir . "/" . $currentDir[0] . "/" . $currentDir[1]);
            $newSelect3 = generateHtmlSelectFromArray($myFiles, "third-select");
            echo $newSelect3;
        }

        if (isset($currentDir[2])) {
            $myFiles =  scannedDir($startDir . "/" . $currentDir[0] . "/" . $currentDir[1] . "/" . $currentDir[2]);
            $newSelect4 = generateHtmlSelectFromArray($myFiles, "fourth-select");
            echo $newSelect4;
        }
        ?>

        <button>Run Live on server</button>
        <button>Read Online</button>
        <button>Download</button>
    </body>
</html>
