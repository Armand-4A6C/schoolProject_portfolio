<?php

class MainController {
    private $EntryModel;
    private $ViewController;

    function __Construct        ($dbName, $username, $pass, $serverAdress, $dbType) {
        $this->EntryModel       = new EntryModel    ($dbName, $username, $pass, $serverAdress, $dbType);
        $this->ViewController   = new ViewController();
    }

    function __Destruct() {
        $this->EntryModel       = NULL;
        $this->ViewController   = NULL;
    }

    public function Controller_404() {
        return $this->ViewController->_404();
    }

    public function Controller_Home() {
        return $this->ViewController->Home();
    }

    public function Controller_Cv() {
        return $this->ViewController->Cv();
    }

    public function Controller_Overmij() {
        return $this->ViewController->Overmij();
    }

    public function Controller_Bewijsstukken() {
        return $this->ViewController->Bewijsstukken();
    }

    public function Controller_ProjectenMetVid() {
        return $this->ViewController->ProjectenMetVid();
    }

    public function Controller_ProjectenZonderVid() {
        return $this->ViewController->ProjectenZonderVid();
    }

    public function Controller_Contact() {
        return $this->ViewController->Contact();
    }

    public function Controller_Sitemap() {
        return $this->ViewController->Sitemap();
    }
}
?>
