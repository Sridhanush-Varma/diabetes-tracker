@echo off
echo ===================================
echo GitHub Pages Deployment Script
echo ===================================

echo Step 1: Building for GitHub Pages...
call npm run build:gh-pages

echo Step 2: Verifying output directory...
if not exist "out" (
  echo Error: Build failed! Output directory not found.
  exit /b 1
)

echo Step 3: Checking for required files...
if not exist "out\.nojekyll" (
  echo Creating .nojekyll file...
  type nul > out\.nojekyll
)

if not exist "out\404.html" (
  echo Copying 404.html to out directory...
  copy public\404.html out\404.html
)

if not exist "out\gh-pages-redirect.js" (
  echo Copying gh-pages-redirect.js to out directory...
  copy public\gh-pages-redirect.js out\gh-pages-redirect.js
)

echo Step 4: Deploying to GitHub Pages...
call npm run deploy

echo ===================================
echo Deployment complete!
echo Your site should be available at:
echo https://YOUR_USERNAME.github.io/Diabetes-Checker/
echo ===================================
