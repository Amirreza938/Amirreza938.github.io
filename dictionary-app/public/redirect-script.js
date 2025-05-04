// This script handles GitHub Pages SPA routing
(function() {
  // Parse the URL
  const url = window.location.href;
  const isRedirect = url.includes('/?/');
  
  // Check if we need to redirect
  if (isRedirect) {
    // Get the actual path from after /?/
    const cleanPath = url.split('/?/')[1];
    if (cleanPath) {
      // Replace the current history state with the clean path
      const newUrl = window.location.origin + '/dictionary-app/' + cleanPath;
      window.history.replaceState(null, null, newUrl);
    }
  }
  
  // Handle redirect from 404.html
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== window.location.href) {
    window.history.replaceState(null, null, redirect.split('/?/')[1] || '/');
  }
})();
