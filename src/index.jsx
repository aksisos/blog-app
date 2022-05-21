import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { MemoizedApp } from './App';
import store from './redux/store';

const container = document.getElementById('root');
const rot = createRoot(container);
rot.render(
  <Provider store={store}>
    <Router>
      <MemoizedApp />
    </Router>
  </Provider>
);
