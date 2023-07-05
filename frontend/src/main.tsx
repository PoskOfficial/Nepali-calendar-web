import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initSW } from "./lib/sw-helper.js";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.MODE !== "development") {
  initSW();
}
