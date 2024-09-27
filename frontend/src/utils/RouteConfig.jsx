import { lazy } from "react";

const Login = lazy(() => Wait().then(() => import("../screens/Login")));
const Register = lazy(() => Wait().then(() => import("../screens/Register")));
const UserDashboard = lazy(() =>
  Wait().then(() => import("../screens/user/Dashboard"))
);

const RouteConfig = [
  {
    path: "/",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];

const UserRouteConfig = [
  {
    path: "/user/dashboard",
    component: <UserDashboard />,
  },
];

export default RouteConfig;
export { UserRouteConfig };

const Wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
