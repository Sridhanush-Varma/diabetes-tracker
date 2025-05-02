# GitHub Pages Deployment Guide

This guide provides instructions for deploying the Diabetes Tracker application to GitHub Pages.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git
- GitHub account

## Deployment Steps

### 1. Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
```

### 2. Build the Application

Build the application for production:

```bash
npm run build
```

### 3. Deploy to GitHub Pages

Deploy the application to GitHub Pages:

```bash
npm run deploy
```

Alternatively, you can use the provided deployment script:

```bash
./deploy-gh-pages.bat
```

### 4. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the "gh-pages" branch
5. Click "Save"

### 5. Access Your Deployed Application

Your application will be available at:

```
https://YOUR_USERNAME.github.io/Diabetes-Checker/
```

Replace `YOUR_USERNAME` with your GitHub username.

## Troubleshooting

### 404 Errors

If you encounter 404 errors when navigating to pages, it may be due to GitHub Pages routing issues. The application includes a custom 404.html file and redirect script to handle this, but you may need to refresh the page or navigate back to the home page.

### Asset Loading Issues

If assets (CSS, JavaScript, images) fail to load, check the browser console for errors. Make sure the `basePath` and `assetPrefix` in `next.config.js` are set correctly.

### Blank Page

If you see a blank page, it may be due to routing issues. Try navigating to the home page directly:

```
https://YOUR_USERNAME.github.io/Diabetes-Checker/
```

### Deployment Fails

If deployment fails, check the error messages in the console. Make sure you have the necessary permissions to push to the repository.

## Manual Deployment

If you prefer to deploy manually, you can follow these steps:

1. Build the application:
   ```bash
   npm run build
   ```

2. Copy the 404.html file to the out directory:
   ```bash
   copy public\404.html out\404.html
   ```

3. Create a .nojekyll file in the out directory:
   ```bash
   type nul > out\.nojekyll
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Additional Resources

- [Next.js Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Pages](https://pages.github.com/)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)
