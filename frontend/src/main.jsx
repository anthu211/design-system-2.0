import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F9F9F9',
              border: '1px solid #272727',
              fontSize: '12px',
              borderRadius: '8px',
              padding: '10px 14px',
            },
            success: { iconTheme: { primary: '#31A56D', secondary: '#0E0E0E' } },
            error:   { iconTheme: { primary: '#E15252', secondary: '#0E0E0E' } },
            duration: 3000,
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
