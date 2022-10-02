import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWrapper from './AppWrapper';

function renderApplication() {
  ReactDOM.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

renderApplication();
