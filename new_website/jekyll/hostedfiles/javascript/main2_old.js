const fileModule = (function() {
    //private variables + methods
    let navigation = {fileName: "root", url:"", extension:"", children: {}};
    let currentUrl = "";
    let currentFile = navigation


    function p_createExtName(name) {
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

    function p_saveNewDir(res) {
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
            let newObject = {url: currentUrl + res[i] + "/", extension: p_createExtName(res[i]) ,children: {}};
            currentFile.children[res[i]] = newObject
            navigation.children[res[i]] = newObject;
        }
    }

    function p_showNewDir(currentUrl) {
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
            newElementParent.addEventListener('dblclick', function(event) {
                fileModule.controlNavigation(event, "down");
            }), 1;
        }
    }


    // Public variables + methods
    return {
        // currentUrl: "",

        saveNewDir: function(res) {
            res = JSON.parse(res);
            console.log(res);

            p_saveNewDir(res);
            console.log(navigation);

            p_showNewDir(currentUrl)
        },

        scanDir: function(dir) {
            if (dir === undefined || dir === null) {
                dir = "";
            }
            ajax_module.get("php/main.php", {mode:"readDir", url:dir}, fileModule.saveNewDir)
        },

        controlNavigation: function(event, travelDirection) {
            if (travelDirection == "down") {
                let url = currentUrl + "/";

                if (!event.target.classList.contains("parent")) {
                    url += event.target.parentElement.children[1].innerHTML;
                } else {
                    url += event.target.children[1].innerHTML;
                }

                console.log("start test")
                let main = document.getElementById('main-files')
                while (main.firstChild) {
                    main.removeChild(main.firstChild);
                }

                // main.innerHTML = "";

                fileModule.scanDir(url)
                console.log(document.getElementById('main-files').children)
                currentUrl = url;
            }
        }
    }
})();

const onLoad = (function() {
    fileModule.scanDir();
})();
