import React from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { FontsImport, theme } from "./theme/theme";
import RoutesList from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FontsImport />
      <RoutesList />
    </ThemeProvider>
  );
}

export default App;
