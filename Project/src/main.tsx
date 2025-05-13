import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import './styles/_fontsizes.css'
import './styles/_colors.css'



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
