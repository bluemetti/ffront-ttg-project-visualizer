import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import DashboardGeralProjetos from "./pages/dashboard_geral_projetos.tsx"; 
import CadastroAluno from "./pages/cadastros/cadastro_aluno.tsx";
import AboutTTG from "./components/shared/AboutTTG";
import CadastroProjeto from "./pages/cadastros/cadastro_projeto.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sobre-ttg",
    element: <AboutTTG />,
  },
  {
    path: "/dashboard/projetos",
    element: <DashboardGeralProjetos />,
  },
  {
    path: "/orientador/cadastro/aluno",
    element: <CadastroAluno />,
  },
    {
    path: "/orientador/cadastro/projeto",
    element: <CadastroProjeto />,
  },
]);

export default router;