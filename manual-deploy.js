const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const ghPagesDir = path.join(__dirname, 'out');
const repoUrl = 'https://github.com/Sridhanush-Varma/Diabetes-Checker.git';
const branch = 'gh-pages';

// Function to execute shell commands
function exec(command) {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Main function
async function deploy() {
  console.log('Starting manual deployment to GitHub Pages...');

  // Check if the out directory exists
  if (!fs.existsSync(ghPagesDir)) {
    console.error('Error: The "out" directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  // Create a temporary directory for deployment
  const tempDir = path.join(__dirname, 'temp-gh-pages');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir);

  try {
    // Change to the temporary directory
    process.chdir(tempDir);

    // Initialize a new git repository
    exec('git init');
    exec('git config --local user.name "GitHub Actions"');
    exec('git config --local user.email "actions@github.com"');

    // Copy the build files
    exec(`cp -r ${ghPagesDir}/* .`);

    // Create a .nojekyll file
    fs.writeFileSync('.nojekyll', '');

    // Add all files
    exec('git add .');

    // Commit the changes
    exec('git commit -m "Deploy to GitHub Pages"');

    // Add the remote repository
    exec(`git remote add origin ${repoUrl}`);

    // Push to the gh-pages branch
    console.log('Pushing to GitHub Pages...');
    console.log('Note: You will be prompted for your GitHub username and password/token.');
    console.log('If you have 2FA enabled, you must use a personal access token instead of your password.');
    exec(`git push -f origin HEAD:${branch}`);

    console.log('Deployment successful!');
  } catch (error) {
    console.error('Deployment failed:', error);
  } finally {
    // Clean up
    process.chdir(__dirname);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

// Run the deployment
deploy();
