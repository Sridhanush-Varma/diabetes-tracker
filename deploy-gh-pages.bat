@echo off
echo Building for GitHub Pages...
call npm run build

echo Copying 404.html to out directory...
copy public\404.html out\404.html

echo Creating .nojekyll file...
type nul > out\.nojekyll

echo Deploying to GitHub Pages...
call npm run deploy

echo Deployment complete!
