import React from 'react';
import ReactDOM from 'react-dom';

import './css/normalize.css';
import './css/reset.css';
import './css/global.css';

import App from './App';
import { Provider } from './components/Context/Context';

import reportWebVitals from './reportWebVitals';
import withContext from './components/Context/Context';
const AppWithContext = withContext(App);

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <AppWithContext />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
