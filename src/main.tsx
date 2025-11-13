import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router/appRoutes.tsx";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  );
}
