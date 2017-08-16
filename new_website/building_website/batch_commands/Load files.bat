@ECHO off

ECHO cd to map location
	CD ../jekyll

ECHO start sass listener
	START cmd /k "sass --watch _sass/index.scss:css/main.css"

ECHO start jekyll listener
	START cmd /k "jekyll serve"

ECHO open project map
	START explorer .

ECHO open the project in browser
	START http://127.0.0.1:4000/

ECHO start github console
	CD C:\Users\gebruiker\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\GitHub, Inc
	START github.appref-ms

TIMEOUT 60
PAUSE

