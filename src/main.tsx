/* ============================================
   Main Entry Point
   DIU Student Welfare System
   ============================================ */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* Design system imports — order matters */
import './assets/styles/variables.css';
import './assets/styles/reset.css';
import './assets/styles/global.css';
import './assets/styles/animations.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
