File system Module
    currentDir = ""
    navigationObject = {}

    navigationObjectController()
    currentDirController()
    eventSetter()
    initModule()


    navigationObject = {
        children        = contains children
        url             = contains url to this file
        extension       = contains extension
        folder          = holds boolean to check if its a folder(true) or not (false)
        exectuteAble    = holds boolean to check if it is executeable (true) or not (false)
    }

    navigationObjectController() {
        >>>creates new objects
        >>>traverses the navigationObject
        >>>opens non folders in new testable
        >>>fires currentDirController()
    }


    currentDirController() {
        >>>setsUrlBar
        >>>loads Files
        >>>load icons
        >>>set currentDir
        >>fires eventSetter
    }


    eventSetter() {
        >>>sets events
    }

    initializationModule() {
        >>>set basic values navigationObject
        >>>loads first items
        >>>set urlbar
        >>>fires eventSetter()
    }
