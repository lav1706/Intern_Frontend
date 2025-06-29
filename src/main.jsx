import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import JobProvider from "./context/JobContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JobProvider>
      <App />
    </JobProvider>
  </StrictMode>
);
