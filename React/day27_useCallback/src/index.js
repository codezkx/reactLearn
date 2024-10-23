import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";

import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  // 开启严格模式
  <StrictMode>
    <App />
  </StrictMode>
);
