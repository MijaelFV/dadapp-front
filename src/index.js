import React from 'react';
import ReactDOM from 'react-dom';
import { DadApp } from './DadApp';
import './styles/index.scss'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <DadApp />,
  document.getElementById('root')
);

serviceWorker.register();
