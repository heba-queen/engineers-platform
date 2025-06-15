import { StrictMode } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import UserProvider from "./context/UserProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
