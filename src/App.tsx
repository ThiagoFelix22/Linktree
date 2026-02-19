import { createBrowserRouter } from "react-router-dom";
// createBrowserRouter ele vai criar as rotas para a aplicação, e cada rota tem um caminho (path) e um elemento (element) que é o componente que será renderizado quando o usuário acessar aquela rota.
 import { Home } from "./pages/home";
 import { Admin } from "./pages/admin";
 import { Network } from "./pages/networks";
 import { Login } from "./pages/login";

 import { Private } from "./routes/private";
 import { Error } from "./pages/error";

 const router = createBrowserRouter([
   {
    path: "/",
    element: <Home />,
   },
   {
    path: "/admin",
    element: <Private><Admin /></Private>,
   },
   {
    path: "/admin/social",
    element: <Private><Network /></Private>,
   },
   {
    path: "/login",
    element: <Login />,
   },
   {
    path: "*",
    element: <Error />
   }
 ]);

 export {router}