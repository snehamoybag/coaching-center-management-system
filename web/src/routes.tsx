import type { RouteObject } from "react-router";
import ProtectedLayout from "./ProtectedLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import postLogin from "./lib/actions/post-login";
import getUser from "./lib/loaders/get-user";

const routes: RouteObject[] = [
  // PUBLIC ROUTES
  {
    path: "/login",
    Component: Login,
    action: postLogin,
  },

  // PROTECTED ROUTES
  {
    Component: ProtectedLayout,
    loader: getUser,
    hydrateFallbackElement: <p>Loading...</p>,

    children: [
      {
        path: "/",
        Component: Home,
        index: true,
      },
    ],
  },
];

export default routes;
