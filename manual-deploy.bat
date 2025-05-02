@echo off
echo ===================================
echo Manual GitHub Pages Deployment Script
echo ===================================

echo Step 1: Building for GitHub Pages...
call npm run build:gh-pages

echo Step 2: Verifying output directory...
if not exist "out" (
  echo Error: Build failed! Output directory not found.
  exit /b 1
)

echo Step 3: Running manual deployment script...
call npm run deploy:manual

echo ===================================
echo Deployment process completed!
echo If successful, your site should be available at:
echo https://YOUR_USERNAME.github.io/Diabetes-Checker/
echo ===================================

pause
