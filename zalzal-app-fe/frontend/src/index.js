import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MapProvider } from './utils/MapContext';

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <MapProvider>
    <App />
    </MapProvider>
  </React.StrictMode>
);
