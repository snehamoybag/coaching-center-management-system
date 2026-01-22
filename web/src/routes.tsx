import type { RouteObject } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import postLogin from "./lib/actions/postLogin";

const routes: RouteObject[] = [
  {
    Component: Root,
    children: [
      { path: "/", Component: Home, index: true },

      {
        path: "/login",
        Component: Login,
        action: postLogin,
      },
    ],
  },
];

export default routes;
