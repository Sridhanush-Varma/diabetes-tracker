// Fix for GitHub Pages 404 issues with Next.js static export
// This script ensures that assets are loaded correctly with relative paths
(function() {
  // Add event listener for all link clicks
  document.addEventListener('click', function(e) {
    // Check if the clicked element is a link
    if (e.target.tagName === 'A' && e.target.href) {
      // Get the href attribute
      const href = e.target.getAttribute('href');

      // Check if it's an internal link (doesn't start with http or //)
      if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
        // Prevent default link behavior
        e.preventDefault();

        // Get the current path
        const currentPath = window.location.pathname;

        // Calculate the new path
        let newPath;
        if (href.startsWith('/')) {
          // Absolute path
          newPath = href;
        } else {
          // Relative path
          const pathParts = currentPath.split('/');
          pathParts.pop(); // Remove the last part
          newPath = pathParts.join('/') + '/' + href;
        }

        // Navigate to the new path
        window.location.href = newPath;
      }
    }
  });

  // Fix for asset paths
  // This ensures that all assets are loaded with relative paths
  const fixAssetPaths = function() {
    // Fix script src attributes
    document.querySelectorAll('script[src]').forEach(function(script) {
      const src = script.getAttribute('src');
      if (src && src.startsWith('/')) {
        script.setAttribute('src', '.' + src);
      }
    });

    // Fix link href attributes
    document.querySelectorAll('link[href]').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        link.setAttribute('href', '.' + href);
      }
    });

    // Fix image src attributes
    document.querySelectorAll('img[src]').forEach(function(img) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('/')) {
        img.setAttribute('src', '.' + src);
      }
    });
  };

  // Run the fix when the page loads
  window.addEventListener('DOMContentLoaded', fixAssetPaths);
})();
