@echo off
title Upload Artwork to Portfolio
echo ===================================================
echo 🎨      PORTFOLIO ARTWORK UPLOAD ASSISTANT         
echo ===================================================
echo.
echo Launching upload assistant in Node.js...
echo.
node upload.js
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] The upload assistant crashed or exited with an error.
    echo Check above for details. If Node is not installed, download it from https://nodejs.org
    echo.
    echo Press any key to close this window...
    pause > nul
)
