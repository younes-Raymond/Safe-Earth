import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider  } from 'react-redux';
import store from './store';

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
 // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
