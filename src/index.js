import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./i18n.js";

import App from "./components/App.jsx";
import store from "./slices/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </Provider>
);
