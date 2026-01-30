import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS GLOBAL
import 'normalize.css';
import 'animate.css';

// SCSS GLOBAL
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
