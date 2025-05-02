# Manual Deployment to GitHub Pages

This guide provides step-by-step instructions for manually deploying the Diabetes Tracker application to GitHub Pages when GitHub Actions is not working.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git
- GitHub account
- GitHub Personal Access Token (PAT) with `repo` permissions

## Creating a Personal Access Token (PAT)

1. Go to your GitHub account settings
2. Click on "Developer settings" in the left sidebar
3. Click on "Personal access tokens" and then "Tokens (classic)"
4. Click "Generate new token" and then "Generate new token (classic)"
5. Give your token a descriptive name (e.g., "Diabetes Tracker Deployment")
6. Select the `repo` scope to allow the token to access your repositories
7. Click "Generate token"
8. **IMPORTANT**: Copy the token immediately and save it in a secure location. You won't be able to see it again!

## Manual Deployment Steps

### Option 1: Using the Manual Deployment Script

We've created a script to simplify the manual deployment process:

1. Build the application:
   ```bash
   npm run build:gh-pages
   ```

2. Run the manual deployment script:
   ```bash
   npm run deploy:manual
   ```

3. When prompted, enter your GitHub username and the Personal Access Token you created earlier.

### Option 2: Using the gh-pages Package

1. Build the application:
   ```bash
   npm run build:gh-pages
   ```

2. Configure Git with your GitHub credentials:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. Set up credential helper to use your PAT:
   ```bash
   git config --global credential.helper store
   ```

4. Deploy using the gh-pages package:
   ```bash
   npm run deploy
   ```

   When prompted, enter your GitHub username and the Personal Access Token you created earlier.

### Option 3: Manual Git Commands

If the above methods don't work, you can deploy manually using Git commands:

1. Build the application:
   ```bash
   npm run build:gh-pages
   ```

2. Create a temporary directory for deployment:
   ```bash
   mkdir temp-gh-pages
   cd temp-gh-pages
   ```

3. Initialize a new Git repository:
   ```bash
   git init
   git config --local user.name "Your Name"
   git config --local user.email "your.email@example.com"
   ```

4. Copy the build files:
   ```bash
   cp -r ../out/* .
   ```

5. Create a .nojekyll file:
   ```bash
   touch .nojekyll
   ```

6. Add all files and commit:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   ```

7. Add the remote repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/Diabetes-Checker.git
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

8. Push to the gh-pages branch:
   ```bash
   git push -f origin HEAD:gh-pages
   ```
   When prompted, enter your GitHub username and the Personal Access Token you created earlier.

## Troubleshooting

### Authentication Issues

If you encounter authentication issues:

1. Make sure you're using a Personal Access Token (PAT) with the `repo` scope
2. Check that you're entering your GitHub username correctly
3. Try using the HTTPS URL with your PAT embedded:
   ```bash
   git remote set-url origin https://YOUR_USERNAME:YOUR_PAT@github.com/YOUR_USERNAME/Diabetes-Checker.git
   ```
   Replace `YOUR_USERNAME` with your GitHub username and `YOUR_PAT` with your Personal Access Token.

### Permission Denied Errors

If you see "Permission denied" errors:

1. Make sure your PAT has the correct permissions
2. Check that you're the owner of the repository or have write access
3. Try using SSH authentication instead of HTTPS

### Other Issues

If you encounter other issues:

1. Check the GitHub status page to see if there are any ongoing service disruptions
2. Try clearing your Git credentials and re-entering them
3. Check your repository settings to ensure GitHub Pages is enabled

## After Deployment

After successful deployment:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Make sure the source is set to the "gh-pages" branch
5. Your site should be available at `https://YOUR_USERNAME.github.io/Diabetes-Checker/`
