@echo off
title Cloudflare Pages Deployment - thedustyphoenix
echo ===================================================
echo   Cloudflare Pages Deployment for thedustyphoenix
echo ===================================================
echo.
echo [1/3] Building the website...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build failed! Please fix any code errors first.
    goto end
)

echo.
echo [2/3] Checking Cloudflare authorization ...
echo If a browser window opens, please log in to your Cloudflare account.
echo.
call npx wrangler login
echo.
echo Your Cloudflare production branch is configured as 'production' (direct deploy).
set "DEPLOY_BRANCH=production"

echo.
echo [3/3] Deploying to Cloudflare Pages (thedustyphoenix, branch: %DEPLOY_BRANCH%)...
call npx wrangler pages deploy dist --project-name=thedustyphoenix --branch=%DEPLOY_BRANCH%
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Deployment failed!
    goto end
)

echo.
echo ===================================================
echo 🎉 SUCCESS! Your website is updated on Cloudflare Pages!
echo ===================================================

:end
echo.
echo This window will stay open so you can read the output.
echo Press any key to close this window...
pause > nul
