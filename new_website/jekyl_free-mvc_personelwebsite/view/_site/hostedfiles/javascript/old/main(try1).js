const FileModule = (function() {
    const navigationObject = {
        children: {},       //= contains children
        url: "",            //= contains url to this file
        extension: "",      //= contains extension
        folder: false,      //= holds boolean to check if its a folder(true) or not (false)
        exectuteAble: false //= holds boolean to check if it is executeable (true) or not (false)
    };

    const p_navObjectController = (function() {
        // >>>creates new objects
        // >>>traverses the navigationObject
        // >>>opens non folders in new testable
        // >>>fires currentDirController()

        return {
            Run: function() {

            }
        }
    })();

    const p_currentDirController = (function() {
        // >>>setsUrlBar

        // >>>load icons
        function p_SetIconUrl(name) {
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



        // >>>loads Data
        function ScanNewDiR(dir) {
            if (dir === undefined || dir === null) {
                dir = "";
            }
            ajax_module.get("php/main.php", {mode:"readDir", url:dir}, fileModule.saveNewDir)
        }

        // >>>set currentDir
        function SaveNewDiR() {
            if (currentUrl === undefined || (currentUrl === null) ) {
                currentUrl = "";
            } else {
                let urlArray = currentUrl.split('/');
                // currentFile = urlArray[urlArray.length-1]

                // let object = navigation;
                // for (var i = 1; i < urlArray.length; i++) {
                //     object = object.children[urlArray[i]]
                // }
                console.log(urlArray);

                navigation = getUrl(urlArray, navigation);
                function getUrl(localUrlArray, localObject) {

                    if (localUrlArray[1] && localObject.children[localUrlArray[1]]) {
                        if (localUrlArray[1] && localObject.children[localUrlArray[1]]) {
                            localUrlArray.shift();
                            localObject = getUrl(localUrlArray, localObject.children[localUrlArray[0]]);
                        } else {
                            localObject = localObject.children[localUrlArray[0]];
                        }
                    }
                    return localObject;
                }
            }

            for (var i = 0; i < res.length; i++) {
                let newObject = {
                    url: currentUrl + res[i] + "/",
                    extension: p_SetIconUrl(res[i]),
                    children: {}
                };

                currentFile.children[res[i]] = newObject;
                navigation.children[res[i]] = newObject;
            }
        }

        // >>>loads Files
        function p_LoadUINewDir(currentUrl) {
            let object = navigation.children;

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


            }
        }

        // >>>fires eventSetter
        function FireEventSetter() {
            newElementParent.addEventListener('dblclick', function(event) {
                fileModule.controlNavigation(event, "down");
            }), 1;
        }


        return {
            Run: function() {

            }
        }
    })();

    const p_eventSetter = (function() {
        // >>>sets events

        function SetEvent(domElement) {
            domElement.addEventListener('dblclick', function(event) {
                // fileModule.controlNavigation(event, "down");
            }), 1;
        }

        return {
            Run: function(domElement) {
                SetEvent(domElement);
            }
        }
    })();

    const p_initializationModule = (function() {
        // >>>set basic values navigationObject
        // >>>loads first items
        // >>>set urlbar
        // >>>fires eventSetter()

        return {
            Run: function() {
                console.log("initialize FileModule")
            }
        }
    })();

    return {
        navObjectController: function() {
            p_navObjectController();
        },

        initializationModule: function(){
            p_initializationModule.Run();
        }
    }

})();

const OnLoad = (function() {
    FileModule.initializationModule();
})();
