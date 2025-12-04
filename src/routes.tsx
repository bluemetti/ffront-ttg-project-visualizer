import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import DashboardGeralProjetos from "./pages/dashboard_geral_projetos.tsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard/projetos",
    element: <DashboardGeralProjetos />,
  },
]);

export default router;