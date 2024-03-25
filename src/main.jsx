import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./comp/Login";
import Dashboard from "./comp/Dashboard";
import Page from "./comp/Page";
import "bootstrap/dist/css/bootstrap.min.css";
import Forgot from "./comp/Forgot";
import Createuser from "./comp/Createuser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Page />, 
  },
  {
    path: "/createuser",
    element: <Createuser />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
