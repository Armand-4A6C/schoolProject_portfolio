<?php

require_once "model/EntryModel.php";
require_once "controller/MainController.php";
require_once "controller/ViewController.php";

class EntryController {
    private $MainController;

    public function __construct ($dbName, $username, $pass, $serverAdress = "localhost", $dbType = "mysql") {
        $this->MainController   = new MainController($dbName, $username, $pass, $serverAdress, $dbType);
    }

    public function __destruct() {
        $this->MainController   = NULL;
    }

    public function HandleRequest() {

        if ( isset($_GET["view"] ) ) {
            $view = $_GET["view"];
        } else {
            $view = "";
        }

        switch ($view) {

            case 'home':
                return $this->MainController->Controller_Home();
                break;

            case 'cv';
                return $this->MainController->Controller_cv();
                break;

            case 'overmij';
                return $this->MainController->Controller_overmij();
                break;

            case 'bewijsstukken';
                return $this->MainController->Controller_bewijsstukken();
                break;

            case 'projecten';
                return $this->ProjectenSwitch();
                break;

            case 'contact':
                return $this->MainController->Controller_Contact();
                break;

            case 'sitemap':
                return $this->MainController->Controller_Sitemap();
                break;

            case '404':
                return $this->MainController->Controller_404();
                break;

            default:
                return $this->MainController->Controller_Home();
                break;
        }
    }

    public function ProjectenSwitch() {
        // check if subview exists
        if ( isset($_GET["subview"]) ) {
            switch ($_GET["subview"]) {
                case 'metvid':
                    return $this->MainController->Controller_projectenMetVid();
                    break;

                case 'zondervid':
                    return $this->MainController->Controller_projectenZonderVid();
                    break;

                case 'checkers':
                    // return $this->MainController->Controller_projects();
                    // break;

                default:
                    return $this->MainController->Controller_404();
                    break;
            }
        }

    }

}

?>
