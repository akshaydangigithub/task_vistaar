import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import RouteConfig, { UserRouteConfig } from "./utils/RouteConfig";

const App = () => {

  return (
    <Routes>
      {RouteConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
        />
      ))}

      {UserRouteConfig.map((route, index) => (
        <Route
          path={route.path}
          key={index}
          element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
        />
      ))}
    </Routes>
  );
};

export default App;
