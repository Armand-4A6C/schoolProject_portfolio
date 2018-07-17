@ECHO off

ECHO start sass listener
	START cmd /k "sass --watch _sass/index.scss:css/main.css"

TIMEOUT 60
PAUSE

