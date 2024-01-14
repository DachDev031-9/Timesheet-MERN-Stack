import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Allproject from './pages/Allproject';
import Allcustomer from './pages/Allcustomer';
import Alluser from './pages/Alluser';
import Adduser from './pages/Adduser';
import Edituser, { loader as loaderEdituser } from './pages/Edituser';
import AllJobposition from './pages/AllJobposition';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/",
    element: <DashboardLayout/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: "alluser",
        element: <Alluser/>,
      },
      {
        path: "adduser",
        element: <Adduser/>,
      },
      {
        path: "edituser/:id",
        element: <Edituser/>,
        loader : loaderEdituser
      },
      {
        path: "alljobposition",
        element: <AllJobposition/>,
      },
      {
        path: "allproject",
        element: <Allproject/>,
      },
      {
        path: "allcustomer",
        element: <Allcustomer/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
