import React from 'react'
import ReactDOM from 'react-dom/client'
import StandalonePortalApp from './StandalonePortalApp'
import './portal.css'

ReactDOM.createRoot(document.getElementById('portal-root')!).render(
  <React.StrictMode>
    <StandalonePortalApp />
  </React.StrictMode>,
)
