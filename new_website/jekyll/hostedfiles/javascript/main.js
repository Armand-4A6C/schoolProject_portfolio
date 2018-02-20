const FileModule = (function() {

    /*************************
      Start Private Properties
    **************************/
    const navigationObject = {
        children: {},       //= contains children
        currentUrl: "",            //= contains url to this file
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

        return {
            Run: function(targetElement) {
                Run(targetElement);
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

        function RunStart(travelDirection, Event) {
            console.log("p_NavObjectController/runStart()");
            console.log(event);
            console.log("");
            if (travelDirection == "down") {
                let url = navigationObject.currentUrl + "/";
                url = GetUrlText(url, event);
                navigationObject.currentUrl = url;

                (function EndOfRunStart(url) {
                    p_DirScanner.Run(url, DirScannerCallBack);

                    // Required CallbackFunc
                    function DirScannerCallBack(scanRes) {
                        parsedRes = JSON.parse(scanRes);
                        Main(parsedRes);
                    }
                })(url);

                // console.log(document.getElementById('main-files').children);
            }
        }

        function Main(ParsedRes) {
            console.log("p_NavObjectController/Main() parsedRes");
            console.log(parsedRes);
            console.log("");

            RemoveCurrentItems();

            SetNewNavChildren(parsedRes);
            p_ControlView.Run();
        }

        return {
            // >>>creates new objects
            SetNewNavChildren: function(res) {
                return SetNewNavChildren(res);
            },

            Run: function(travelDirection, Event) {
                RunStart(travelDirection, Event);
            }
        }
        // >>>traverses the navigationObject
        // >>>opens non folders in new testable
        // >>>fires currentDirController()
    })();

    const p_CurrentDirController = (function() {
        // >>>setsUrlBar
        // >>>loads Data
        // >>>set currentDir
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
