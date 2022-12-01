import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n.ts';

import App from './components/App';
import Loading from './components/Loading';
import store from './slices/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.Suspense fallback={<Loading />}>
      <App />
    </React.Suspense>
  </Provider>
);
