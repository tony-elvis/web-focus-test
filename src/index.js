import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RoutesApp from './routes/Routes';
import ReactModal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactModal.setAppElement('#root');

root.render(
  <React.StrictMode>
    <RoutesApp />
  </React.StrictMode>
);
