@echo off
title MyCalci Launcher
echo ========================================
echo       Starting MyCalci Web App...
echo ========================================
echo.
echo Opening browser at http://localhost:5173...
start http://localhost:5173
echo.
npm run dev
pause
