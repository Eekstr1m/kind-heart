import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./pages/router.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Geometria, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  palette: {
    primary: { main: "#e53656", light: "#ad568d", dark: "#bb2a63" },
    secondary: { main: "#363b5d", light: "#3d5b8d", dark: "#2C395A" },
    grey: {
      100: "#C5D5E6",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </StrictMode>
);
