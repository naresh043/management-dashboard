import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext.jsx";

import "primereact/resources/themes/lara-light-blue/theme.css";

import AuthProvider from "./context/AuthContext.jsx";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
