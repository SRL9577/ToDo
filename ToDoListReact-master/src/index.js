import React from 'react';
import ReactDOM from 'react-dom/client';  // ודא שאתה משתמש ב-import הנכון
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // יצירת root חדש
root.render(<App />);