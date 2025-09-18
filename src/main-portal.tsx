import React from 'react'
import ReactDOM from 'react-dom/client'
import StandalonePortalApp from './StandalonePortalApp'
import './portal.css'

// Ensure no website CSS is loaded
const existingStyles = document.querySelectorAll('link[rel="stylesheet"], style');
existingStyles.forEach(style => {
  if (style.getAttribute('href')?.includes('index.css') || 
      style.textContent?.includes('website') ||
      style.textContent?.includes('main.css')) {
    style.remove();
  }
});

ReactDOM.createRoot(document.getElementById('portal-root')!).render(
  <React.StrictMode>
    <StandalonePortalApp />
  </React.StrictMode>,
)