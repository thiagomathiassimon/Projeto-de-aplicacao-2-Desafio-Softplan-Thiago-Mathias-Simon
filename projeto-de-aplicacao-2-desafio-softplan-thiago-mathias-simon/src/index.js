import './index.css';
import React from 'react';
import 'typeface-montserrat';
import store from './redux/store';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Processo from './pages/Processo';
import reportWebVitals from './reportWebVitals';
import { criarServidor } from './services/mirage-server';

const ambiente = process.env.NODE_ENV;
if (ambiente !== "production") {
  criarServidor({ environment: ambiente })
}

ReactDOM.render(
  <Provider store={store}>
    <Processo />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
