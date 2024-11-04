import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Fonction pour initialiser l'app dans WordPress
const initializeApp = () => {
  const container = document.getElementById('interactive-universities-map');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App 
          pluginUrl={window.iumData?.pluginUrl || ''}
        />
      </React.StrictMode>
    );
  }
};

// Si on est dans WordPress, on attend que le DOM soit chargé
if (window.iumData) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }
} else {
  // Mode développement standalone
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}