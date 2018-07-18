<?php
require_once "model/HtmlElements-v1.1.php";
require_once "model/TemplatingSystem-v1.php";

class ViewController {
    private $TemplatingSystem;

    public function __construct() {
        $this->TemplatingSystem = new TemplatingSystem("view/assets/templates/default.tpl");
    }

    public function __destruct() {
        $TemplatingSystem = NULL;
    }

    public function Home() {
        $this->DefaultTemplating();

        $main = file_get_contents("view/assets/partials/home.html");
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "Home");
        $this->TemplatingSystem->SetTemplateData("keywords", "home, Armaniimus, Webdevelopment, Armand, van, Alphen,");
        $this->TemplatingSystem->SetTemplateData("description", "Op deze homepagina kunt u een overzicht zien over de rest van de website");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Cv() {
        $this->defaultTemplating();

        $main = file_get_contents("view/assets/partials/cv.html");
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "Cv");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Bewijsstukken() {
        $this->defaultTemplating();

        $main = file_get_contents("view/assets/partials/bewijsstukken.html");
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "Bewijsstukken");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Overmij() {
        $this->defaultTemplating();

        // $main = file_get_contents("view/assets/partials/home.html");
        $main = "<div style='height: 250px;'></div>";
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Projectenzondervid() {
        $this->defaultTemplating();

        // $main = file_get_contents("view/assets/partials/home.html");
        $main = "<div style='height: 250px;'></div>";
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Projectenmetvid() {
        $this->defaultTemplating();

        // $main = file_get_contents("view/assets/partials/home.html");
        $main = "<div style='height: 250px;'></div>";
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Contact() {
        $this->defaultTemplating();

        // $main = file_get_contents("view/assets/partials/home.html");
        $main = "<div style='height: 250px;'></div>";
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function Sitemap() {
        $this->defaultTemplating();

        // $main = file_get_contents("view/assets/partials/home.html");
        $main = "<div style='height: 250px;'></div>";
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    public function _404() {
        $this->defaultTemplating();

        $main = file_get_contents("view/assets/partials/404.html");
        $this->TemplatingSystem->SetTemplateData("main", $main);

        $this->TemplatingSystem->SetTemplateData("title", "404");
        $this->TemplatingSystem->SetTemplateData("keywords", "");
        $this->TemplatingSystem->SetTemplateData("description", "");

        return $this->TemplatingSystem->GetParsedTemplate();
    }

    private function DefaultTemplating() {
        $header = file_get_contents("view/assets/templates/header.tpl");
        $footer = file_get_contents("view/assets/templates/footer.tpl");

        $meta = file_get_contents("view/assets/templates/metadata.tpl");
        $ad = file_get_contents("view/assets/templates/ad.tpl");

        $this->TemplatingSystem->SetTemplateData("header", $header);
        $this->TemplatingSystem->SetTemplateData("footer", $footer);

        $this->TemplatingSystem->SetTemplateData("meta", $meta);
        $this->TemplatingSystem->SetTemplateData("ad", $ad);
    }
}
