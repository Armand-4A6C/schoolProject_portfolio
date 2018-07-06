<?php

require_once "model/EntryModel.php";
require_once "controller/ViewController.php";

class MainController {
    private $EntryModel;

    public function __construct($dbName, $username, $pass, $serverAdress = "localhost", $dbType = "mysql" ) {
        $this->EntryModel       = new EntryModel    ($dbName, $username, $pass, $serverAdress, $dbType);
        $this->ViewController   = new ViewController();
    }

    public function __destruct() {
        $this->EntryModel       = NULL;
        $this->ViewController   = NULL;
    }

    public function handleRequest() {

        if (isset($_GET["view"])) {
            $view = $_GET["view"];
        } else {
            $view = "";
        }

        switch ($view) {

            case 'home':
                $this->Controller_Home();
                break;

            case 'cv';
                $this->controller_cv();
                break;

            case 'overmij';
                $this->controller_overmij();
                break;

            case 'projectenmetvid';
                $this->Controller_projectenMetVid();
                break;

            case 'projectenzondervid';
                $this->Controller_projectenZonderVid();
                break;

            case 'contact':
                $this->Controller_Contact();
                break;

            case '404':
                $this->controller_404();
                break;

            default:
                $this->Controller_Home();
                break;
        }
    }

    public function controller_404() {
        // include "view/default.php";
    }

    public function Controller_Home() {

    }

    public function Controller_Contact() {
        include "view/contact.php";
    }

}

?>
