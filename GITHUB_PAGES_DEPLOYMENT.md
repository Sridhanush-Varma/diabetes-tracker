# GitHub Pages Deployment Guide for Diabetes Tracker

This guide provides detailed instructions for deploying the Diabetes Tracker application to GitHub Pages with proper asset loading.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git
- GitHub account

## Understanding the Issues

When deploying Next.js applications to GitHub Pages, several issues can occur:

1. **Asset Path Issues**: GitHub Pages serves content from a subdirectory (e.g., `/Diabetes-Checker/`), but Next.js by default expects assets at the root.
2. **Client-Side Routing**: GitHub Pages doesn't support server-side routing, so all navigation must be client-side.
3. **404 Handling**: GitHub Pages has limited support for custom 404 pages with SPAs.

## Our Solution

We've implemented several fixes to address these issues:

1. **Relative Paths**: Using relative paths (`./`) instead of absolute paths (`/`) for all assets.
2. **Asset Path Fixing Script**: A post-build script that automatically fixes asset paths in HTML files.
3. **Custom 404 Page**: A custom 404.html file that redirects to the main application.
4. **Client-Side Routing**: A script that handles client-side routing for GitHub Pages.

## Deployment Steps

### 1. Install Dependencies

First, make sure all dependencies are installed:

```bash
npm install
```

This will install all required packages, including:
- `gh-pages` for deployment
- `cross-env` for environment variables

### 2. Build the Application for GitHub Pages

We've created a special build script for GitHub Pages:

```bash
npm run build:gh-pages
```

This script:
1. Builds the Next.js application
2. Runs the asset path fixing script
3. Ensures all necessary files are in place

### 3. Deploy to GitHub Pages

Deploy the application using the gh-pages package:

```bash
npm run deploy
```

### 4. Automated Deployment Script

For convenience, we've created a batch script that handles the entire process:

```bash
./deploy-gh-pages.bat
```

This script:
1. Builds the application for GitHub Pages
2. Verifies the output directory
3. Checks for required files
4. Deploys to GitHub Pages

### 5. Configure GitHub Pages Settings

After deployment:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "Pages" section
4. Under "Source", select the "gh-pages" branch
5. Click "Save"

### 6. Access Your Deployed Application

Your application will be available at:

```
https://YOUR_USERNAME.github.io/Diabetes-Checker/
```

Replace `YOUR_USERNAME` with your GitHub username.

## Troubleshooting Common Issues

### 404 Errors for Resources

If you see 404 errors for resources in the console:

1. Check that the asset path fixing script ran correctly
2. Verify that the `assetPrefix` in `next.config.js` is set to `'./'`
3. Make sure the `gh-pages-redirect.js` script is loaded in the HTML

### Blank Pages or Navigation Issues

If you encounter blank pages or navigation issues:

1. Try accessing the page directly with the full URL
2. Check that the client-side routing script is working
3. Verify that all links in the application use relative paths

### Deployment Failures

If deployment fails:

1. Check that you have the necessary permissions to push to the repository
2. Verify that the `gh-pages` package is installed
3. Check for any error messages in the console

## Manual Verification Steps

After deployment, verify:

1. The homepage loads correctly
2. Navigation between pages works
3. All assets (CSS, JavaScript, images) load without 404 errors
4. The application works in both light and dark themes
5. Authentication and data loading function properly

## Configuration Files

The following files have been configured for GitHub Pages:

- `next.config.js`: Contains the output, basePath, and assetPrefix settings
- `scripts/fix-asset-paths.js`: Post-build script to fix asset paths
- `public/gh-pages-redirect.js`: Client-side routing script for GitHub Pages
- `public/404.html`: Custom 404 page for GitHub Pages
- `package.json`: Contains the build and deploy scripts

## Additional Resources

- [Next.js Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [SPA GitHub Pages Deployment](https://github.com/rafgraph/spa-github-pages)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)
