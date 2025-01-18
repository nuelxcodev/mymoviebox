import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Themeprovider from "./utils/themeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Themeprovider>
      <App />
    </Themeprovider>
  </StrictMode>
);
