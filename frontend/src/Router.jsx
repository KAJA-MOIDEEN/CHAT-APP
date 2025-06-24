import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import VerifyEmail from "./pages/VerifyPage";
import Chat from "./pages/Chat";
import HomePage from "./pages/Profile";
import Settings from "./pages/Settings";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <Home />,
        children: [
          { path: "message", element: <Chat /> },
          { path: "settings", element: <Settings /> },
          { path: "wishlist", element: <Settings /> },
          { index: true, element: <HomePage /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/notFoundPage", element: <NotFoundPage /> },
      { path: "/:id/verify/:token/:email", element: <VerifyEmail /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default Router;
