const fs = require('fs');
const path = require('path');

// Directory to process
const outDir = path.join(__dirname, '..', 'out');

// Function to recursively process HTML files
function processHtmlFiles(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      // Process HTML files
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace absolute paths with relative paths
      content = content.replace(/src="\/_next\//g, 'src="./_next/');
      content = content.replace(/href="\/_next\//g, 'href="./_next/');
      content = content.replace(/src="\/images\//g, 'src="./images/');
      content = content.replace(/href="\/images\//g, 'href="./images/');
      
      // Fix internal links
      content = content.replace(/href="\//g, 'href="./');
      
      // Write the modified content back to the file
      fs.writeFileSync(filePath, content);
      console.log(`Processed: ${filePath}`);
    }
  });
}

// Function to copy the .nojekyll file
function copyNojekyllFile() {
  const sourcePath = path.join(__dirname, '..', '.nojekyll');
  const destPath = path.join(outDir, '.nojekyll');
  
  // Create an empty .nojekyll file if it doesn't exist
  fs.writeFileSync(destPath, '');
  console.log('Created .nojekyll file');
}

// Function to copy the 404.html file
function copy404File() {
  const sourcePath = path.join(__dirname, '..', 'public', '404.html');
  const destPath = path.join(outDir, '404.html');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('Copied 404.html file');
  }
}

// Function to copy the gh-pages-redirect.js file
function copyRedirectScript() {
  const sourcePath = path.join(__dirname, '..', 'public', 'gh-pages-redirect.js');
  const destPath = path.join(outDir, 'gh-pages-redirect.js');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('Copied gh-pages-redirect.js file');
  }
}

// Main function
function main() {
  console.log('Starting asset path fix process...');
  
  // Process HTML files
  processHtmlFiles(outDir);
  
  // Copy necessary files
  copyNojekyllFile();
  copy404File();
  copyRedirectScript();
  
  console.log('Asset path fix process completed!');
}

// Run the main function
main();
