const FileModule = (function() {

    const navigationObject = {
        children: {},       //= contains children
        url: "",            //= contains url to this file
        extension: "",      //= contains extension
        folder: false,      //= holds boolean to check if its a folder(true) or not (false)
        exectuteAble: false //= holds boolean to check if it is executeable (true) or not (false)
    };
    let currentUrl = "";
    let currentFile = navigationObject;

    const p_NavObjectController = (function() {
        // >>>creates new objects
        // >>>traverses the navigationObject
        // >>>opens non folders in new testable
        // >>>fires currentDirController()
    })();

    const p_ControlView = (function() {

        // >>>loads Files
        // >>>fires eventSetter
        function Run(currentUrl) {
            let object = navigationObject.children;

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
            Run: function(currentUrl) {
                Run(currentUrl);
            }
        }
    })();

    const p_CurrentDirController = (function() {
        // >>>setsUrlBar
        // >>>loads Data
        // >>>set currentDir
    })();

    const p_EventSetter = (function() {
        function Run(targetElement) {
            targetElement.addEventListener('dblclick', function(event) {
                FileModule.controlNavigation(event, "down");
            }), 1;
        }

        return {
            Run: function(targetElement) {
                Run(targetElement)
            }
        }

    })();

    const p_InitializationModule = (function() {
        function Start() {
            FileModule.DirScanner("", DirScannerCallBack);
        }

        function DirScannerCallBack(scanRes) {
            parsedRes = JSON.parse(scanRes);
            Main(parsedRes);
        }

        function Main(parsedRes) {
            console.log("InitializationModule/Main parsedRes")
            console.log(parsedRes);
            console.log("")

            SetDir(parsedRes);
            p_ControlView.Run(currentUrl);
        }

        function SetDir(res) {
            currentUrl = "";

            for (var i = 0; i < res.length; i++) {
                let newObject = {url: currentUrl + res[i] + "/", extension: p_IconLoader.Run(res[i]) ,children: {}};
                navigationObject.children[res[i]] = newObject;
                currentFile.children[res[i]] = newObject
            }
            console.log("InitializationModule/SetDir navigationObject")
            console.log(navigationObject)
            console.log("")

            console.log("InitializationModule/SetDir currentFile")
            console.log(currentFile)
            console.log("")
        }

        // >>>set basic values navigationObject
        // >>>loads first items
        // >>>set urlbar
        // >>>fires eventSetter()

        return {
            Run: function() {
                Start();
            }
        }
    })();

    const p_IconLoader = (function(Filename) {
        // >>>set icon
        function SetIcon () {
            let ext = "";
            let arrayOfStrings = name.split(".");
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
            Run: function() {
                return SetIcon(Filename);
            }
        }

    })();

    const p_DirScanner = (function() {
        // >>>ScansDir

        function ScanDir(dir, nextMethod) {
            if (dir === undefined || dir === null) {
                dir = "";
            }
            ajax_module.get("php/main.php", {mode:"readDir", url:dir}, nextMethod)
        }

        return {
            Run: function(dir, nextMethod) {
                ScanDir(dir, nextMethod);
            },
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
