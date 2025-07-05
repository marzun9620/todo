import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Layout, Home, NoMatch } from "./App";
import { 
  UsersRoute, 
  usersLoader, 
  NewUserRoute,
  EditUserRoute,
  editUserLoader
} from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-md p-6">
        <h2 className="text-lg font-medium text-red-900 mb-2">Application Error</h2>
        <p className="text-red-700">Something went wrong. Please check that the database is running and try again.</p>
      </div>
    </div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "users",
        element: <UsersRoute />,
        loader: usersLoader,
        errorElement: <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-6">
            <h2 className="text-lg font-medium text-red-900 mb-2">Failed to Load Users</h2>
            <p className="text-red-700">Could not connect to the database. Please ensure PostgreSQL is running.</p>
          </div>
        </div>
      },
      {
        path: "users/new",
        element: <NewUserRoute />
      },
      {
        path: "users/:id/edit",
        element: <EditUserRoute />,
        loader: editUserLoader
      },
      {
        path: "*",
        element: <NoMatch />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
