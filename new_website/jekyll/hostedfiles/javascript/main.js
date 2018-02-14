const fileModule = (function() {
    const navigationObject = {
        children: {},       //= contains children
        url: "",            //= contains url to this file
        extension: "",      //= contains extension
        folder: false,      //= holds boolean to check if its a folder(true) or not (false)
        exectuteAble: false //= holds boolean to check if it is executeable (true) or not (false)
    }

    function p_navObjectController() {

    }

    return {
        navObjectController: p_navObjectController() {
            
        }
    }

})();

const onLoad = (function() {
    fileModule.scanDir();
})();
