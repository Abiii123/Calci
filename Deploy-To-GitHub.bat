@echo off
title Deploy MyCalci to GitHub Pages
echo ========================================
echo    Deploying MyCalci to GitHub Pages
echo ========================================
echo.
echo 1. Pushing main branch with build files...
git push -u origin main --force
echo.
echo 2. Building and deploying to gh-pages branch...
call npm run deploy
echo.
echo ========================================
echo Deployment complete!
echo Please check https://abiii123.github.io/Calci/
echo ========================================
pause
