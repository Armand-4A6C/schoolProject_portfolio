<?php
// require_once "ContentLogic.php";
require_once "SessionModel.php";
require_once "HtmlElements-v1.1.php";

require_once "FileHandler-v1.php";
require_once "FileUploader-v2.php";
require_once "TemplatingSystem-v1.php";

require_once "SecurityHeaders-v1.php";

class EntryModel {

    // private $ContentLogic;
    private $HtmlElements;

    public function __construct($dbName, $username, $pass, $serverAdress, $dbType) {
        // $this->ContentLogic     = new ContentLogic      ($dbName, $username, $pass, $serverAdress, $dbType);
        $this->HtmlElements     = new HtmlElements      ();
    }

    public function __destruct() {
        $this->ContentLogic     = NULL;
        $this->SessionLogic     = NULL;
        $this->HtmlElements     = NULL;
    }

    public function Get404Data() {
        return $this->ContentLogic->Get404Data();
    }

    public function GetContentHome() {
        return $this->ContentLogic->GetHomeData();
    }

    public function GetContentSpecificData($id) {
        return $this->ContentLogic->GetSpecificData($id);
    }

    public function GetContentOverViewData($option = null) {
        return $this->ContentLogic->GetOverViewData($option);
    }

    public function GetContentSearchData($option = null) {
        return $this->ContentLogic->GetSearchData($option);
    }

    // session logic functions
    public function GetAdminLogin() {
        return $this->SessionLogic->AdminLogin();
    }

    public function GetSessionSupport() {
        return $this->SessionLogic->SessionSupport();
    }

    public function GetLogout() {
        return $this->SessionLogic->Logout();
    }

    public function GetAddToCart() {
        return $this->SessionLogic->AddToCart();
    }

    public function GetRemoveFromCart() {
        return $this->SessionLogic->RemoveFromCart();
    }

    public function GetWinkelwagen() {
        // return
        $SessionArray = $this->SessionLogic->WinkelwagenSession();

        if ($SessionArray) {
            $SessionArray = $this->ContentLogic->WinkelwagenContent($SessionArray);
            return $this->GenerateWinkelTable($SessionArray);
        }
    }


    public function GetCreateForm() {
        $columnNames = $this->ContentLogic->GetColumnNames();
        $dataTypes = $this->ContentLogic->GetDataTypes();
        $dataNullArray = $this->ContentLogic->GetDataNull();

        $dataVal = new DataValidator();
        $dataTypes = $dataVal->GetHtmlValidateData($dataTypes);

        return $this->HtmlElements->GenerateForm("post", "index.php?op=create&view=admin_create", "createform", NULL, $columnNames, $dataTypes, $dataNullArray, $option = 1);
    }

    public function CreateNewProduct() {
        return $this->ContentLogic->CreateNewProduct();
    }

    public function GetUpdateForm($id) {
        $data = $this->ContentLogic->GetUpdateInfo($id);

        $columnNames = $this->ContentLogic->GetColumnNames();
        $dataTypes = $this->ContentLogic->GetDataTypes();
        $dataNullArray = $this->ContentLogic->GetDataNull();

        $dataVal = new DataValidator();
        $dataTypes = $dataVal->GetHtmlValidateData($dataTypes);

        return $this->HtmlElements->GenerateForm("post", "index.php?op=update&view=admin_update&id=$id", "updateform", $data, $columnNames, $dataTypes, $dataNullArray, $option = 0);
    }

    public function GetUpdate($id) {
        $this->ContentLogic->Update($id);
    }

    public function GetDelete($id) {
        return $this->ContentLogic->DeleteProduct($id);
    }

    private function GenerateWinkelTable($array) {

        $prijsTotaal = $array[0]["prijsTotaal"];

        $tableHead = "<thead class='winkelwagen--thead'>
            <tr>
                <th>Product</th>
                <th>Prijs</th>
                <th colspan='2'>Aantal</th>
            </tr>
        </thead>";

        $rows = "";
        for ($i=0; $i < count($array); $i++) {
            $rows .= "<tr>
                <td><img class='winkelwagen--img' src='" . $array[$i]["afbeelding"] . "'/> " . $array[$i]["naam"] . "</td>
                <td>" . $array[$i]["prijs"] . "</td>
                <td>"
                    . $array[$i]["aantal"] ."
                </td>
                <td>
                    <a class='winkelwagen--plusknop' href='index.php?view=winkelwagen&id=" . $array[$i]["id"] . "&op=addToCart'>+</a>
                    <a class='winkelwagen--minknop' href='index.php?view=winkelwagen&id=" . $array[$i]["id"] . "&op=RemoveFromCart'>-</a>
                </td>
            </tr>";
        }

        $tableBody = "<tbody class='winkelwagen--tbody'>
            $rows

            <tr>
                <td colspan='4'> <br><br><br><br> </td>
            </tr>
            <tr>
                <td>Verzendkosten</td>
                <td>&euro;6,50</td>
                <td colspan='2'></td>
            </tr>
            <tr>
                <td>Totaal bedrag inclusief btw</td>
                <td>$prijsTotaal</td>
                <td colspan='2'></td>
            </tr>
        </tbody>";


        $table = "<table>" . $tableHead . $tableBody . "</table>
        <button class='winkelwagen--betaalknop' >Bestellen</button>";

        return $table;
    }
}
