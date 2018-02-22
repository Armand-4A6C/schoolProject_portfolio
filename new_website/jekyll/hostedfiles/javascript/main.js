const FileModule = (function() {

    /*************************
      Start Private Properties
    **************************/
    const navigationObject = {
        children: {},       //= contains children
        currentUrl: "",     //= contains url to this file
    };

    /***********************
      Start Private Modules
    ***********************/

    const p_IconLoader = (function() {

        // >>>set icons
        function SetIcon (filename) {
            let ext = "";
            let arrayOfStrings = filename.split(".");
            let check = arrayOfStrings[arrayOfStrings.length-1];

            if (check === "php") {
                ext = "/php.png";

            } else if (check === "html") {
                ext = "/html.png";

            } else if (check === "css") {
                ext = "/css.png";

            } else if (check === "js") {
                ext = "/js.jpg";

            } else if ( (check === "png") || (check === "jpeg") || (check === "jpg") ) {
                ext = "/image.jpg";

            } else if ( (check === "doc") || (check === "docx") ) {
                ext = "/doc.png";

            } else if (check === "txt"){
                ext = "/txt.png";

            } else if (check === "md") {
                ext = "/md.png";

            } else if (check === "json") {
                ext = "/json.png";

            } else {
                ext = "/folder.png";
            }
            return ext;
        }

        return {
            // >>>set icons
            Run: function(filename) {
                return SetIcon(filename);
            }
        }

    })();

    const p_DirScanner = (function() {

        // >>>ScansDir
        function Run(dir, nextMethod) {
            if (dir === undefined || dir === null) {
                dir = "";
            }
            ajax_module.get("php/main.php", {mode:"readDir", url:dir}, nextMethod);
        }

        return {

            // >>>ScansDir
            Run: function(dir, nextMethod) {
                Run(dir, nextMethod);
            },
        }
    })();

    const p_EventSetter = (function() {
        function Run(targetElement) {
            targetElement.addEventListener('dblclick', function(event) {
                p_NavObjectController.Run("down", event);
            }), 1;
        }

        function ReadUpUrl(targetElement, number) {
            targetElement.addEventListener('click', function(event) {
                let storeArray = [];
                console.log("start ReadUpUrl");
                console.log(number);

                for (let i = number; i>=0; i=i-1) {
                    let tmp = document.getElementById("url" + (i)).children[0].innerHTML;
                    console.log(tmp);
                    console.log(i);

                    if (tmp !== "files") {
                        storeArray.unshift("/" + tmp);
                    }
                }
                let result = "";
                for (let i = 0; i < storeArray.length; i++) {
                    result += storeArray[i];
                }
                console.log(result)
                console.log("");

                p_NavObjectController.Run("up", "", result);
            }), 1;
        }

        function ReadUpIcon() {
            document.getElementById('mapUp').addEventListener("click", function(){
                let result = "";
                let urlArray = navigationObject.currentUrl.split("/")
                urlArray.pop();

                for (var i = 0; i < urlArray.length; i++) {
                    if (urlArray[i] !== "") {
                        result += "/" + urlArray[i];
                    }

                }

                p_NavObjectController.Run("up", "", result);
            });
        }

        return {
            Run: function(targetElement) {
                Run(targetElement);
            },
            ReadUpUrl: function(targetElement, nr) {
                ReadUpUrl(targetElement, nr);
            },
            ReadUpIcon :function() {
                ReadUpIcon();
            }
        }

    })();

    const p_ControlView = (function() {

        // >>>loads UI
        // >>>fires eventSetter
        function Run() {
            const object = navigationObject.children;

            console.log(navigationObject.children);

            for (var key in object) {
                let newElementParent = document.createElement('div');
                newElementParent.classList.add("main-files-item");
                newElementParent.classList.add("parent");

                let newElementChild1 = document.createElement('div');
                newElementChild1.style.backgroundImage = "url(icons" + object[key].extension + ")";
                newElementChild1.style.backgroundSize = "contain";
                newElementChild1.classList.add("main-files-item-icon");

                let newElementChild2 = document.createElement('p');
                newElementChild2.innerHTML = key;

                newElementParent.appendChild(newElementChild1);
                newElementParent.appendChild(newElementChild2);

                document.getElementById('main-files').appendChild(newElementParent);
                p_EventSetter.Run(newElementParent);
            }
        }

        return {
            // >>>loads UI
            // >>>fires eventSetter
            Run: function() {
                Run();
            }
        }
    })();

    const p_NavObjectController = (function() {

        // // >>>creates new objects
        function SetNewNavChildren(res) {
            navigationObject.children = [];
            for (var i = 0; i < res.length; i++) {
                let newObject = {
                    url: navigationObject.currentUrl + res[i] + "/",
                    extension: p_IconLoader.Run(res[i])
                };

                navigationObject.children[res[i]] = newObject;
            }
            console.log("p_NavObjectController/SetDir navigationObject");
            console.log(navigationObject);
            console.log("");
        }

        function GetUrlText(url, event) {
            console.log("p_NavObjectController/GetUrlText()")
            console.log("");
            if (!event.target.classList.contains("parent")) {
                url += event.target.parentElement.children[1].innerHTML;
            } else {
                url += event.target.children[1].innerHTML;
            }
            return url;
        }

        function RemoveCurrentItems() {
            console.log("p_NavObjectController/RemoveCurrentItems()")
            console.log("");

            let main = document.getElementById('main-files')
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
        }

        function RunStart(travelDirection, e, receivedUrl) {
            console.log("p_NavObjectController/runStart()");
            console.log(e);
            console.log(travelDirection);
            console.log(receivedUrl);
            console.log("");

            let url;

            if (travelDirection == "down") {
                url = navigationObject.currentUrl + "/";
                url = GetUrlText(url, e);
                navigationObject.currentUrl = url;

            } else if (travelDirection == "up") {
                console.log(receivedUrl);
                url = receivedUrl;
                navigationObject.currentUrl = url;
            } else {
                return false;
            }

            (function EndOfRunStart(url) {
                p_DirScanner.Run(url, DirScannerCallBack);

                // Required CallbackFunc
                function DirScannerCallBack(scanRes) {
                    parsedRes = JSON.parse(scanRes);
                    Main(parsedRes);
                }
            })(url);
        }

        // >>>traverses the navigationObject
        function Main(ParsedRes) {
            console.log("p_NavObjectController/Main() parsedRes");
            console.log(parsedRes);
            console.log("");

            RemoveCurrentItems();

            SetNewNavChildren(parsedRes);
            p_ControlView.Run();

            p_CurrentDirController.Run()
        }

        return {
            // >>>creates new objects
            SetNewNavChildren: function(res) {
                return SetNewNavChildren(res);
            },

            Run: function(travelDirection, Event, receivedUrl) {
                RunStart(travelDirection, Event, receivedUrl);
            }
        }

        // >>>opens non folders in new testable
        // >>>fires currentDirController()
    })();

    const p_CurrentDirController = (function() {
        // >>>setsUrlBar
        // >>>loads Data
        // >>>set currentDir
        function SetUrlParts(currentUrlArray) {
            const urlBar = document.getElementById('urlBar');
            urlBar.innerHTML = "";

            console.log(currentUrlArray);

            let parentElement = document.createElement("UL");
            for (let i = 0; i < currentUrlArray.length; i++) {

                let currentItem = document.createElement("LI");
                currentItem.classList.add("urlBar-item");
                currentItem.id = "url" + i;

                let currentItemLink = document.createElement("A");
                currentItemLink.classList.add("urlBar-item-link");
                currentItemLink.innerHTML = currentUrlArray[i];

                currentItem.appendChild(currentItemLink);
                parentElement.appendChild(currentItem);
            }
            console.log(parentElement);
            document.getElementById('urlBar').appendChild(parentElement);

            for (let i = 0; i < currentUrlArray.length; i++) {
                const htmlObject = document.getElementById('url' + i);
                p_EventSetter.ReadUpUrl(htmlObject, i);
            }
        }

        function Run() {
            let currentUrlArray = navigationObject.currentUrl.split('/');
            currentUrlArray[0] = "files";

            SetUrlParts(currentUrlArray);
        }

        return {
            Run: function() {
                Run();
            }
        }
    })();

    const p_InitializationModule = (function() {

        // >>>Loads first items from php
        function Start() {
            p_DirScanner.Run("", DirScannerCallBack);

            // Required CallbackFunc
            function DirScannerCallBack(scanRes) {
                parsedRes = JSON.parse(scanRes);
                Main(parsedRes);
            }
        }

        function Main(parsedRes) {
            console.log("InitializationModule/Main parsedRes");
            console.log(parsedRes);
            console.log("");

            // >>>Set basic values navigationObject
            navigationObject.currentUrl = "";
            p_NavObjectController.SetNewNavChildren(parsedRes);

            // >>>Set EventListener
            // >>>Sets Ui
            p_ControlView.Run();
            p_EventSetter.ReadUpIcon();
        }

        // >>>set urlbar
        return {
            Run: function() {
                Start();
            }
        }
    })();

    const p_MainRun = (function() {
        return {
            Run: function() {
                filename.split(".")
            }
        }
    })();

    return {
        navObjectController: function() {
            p_NavObjectController();
        },

        DirScanner: function(dir, nextMethod) {
            return p_DirScanner.Run(dir, nextMethod);
        },

        InitModule: function() {
            p_InitializationModule.Run();
        },

        Run: function(res) {
            p_MainRun.Run(res);
        }
    }
})();

FileModule.InitModule();

const OnLoad = (function() {
    // FileModule.initializationModule.run();
})();
