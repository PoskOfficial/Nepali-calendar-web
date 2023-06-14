import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./components/Calendar.tsx";
import UpcomintEvents from "./UpcomintEvents.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Calendar />,
  },
  {
    path: "/upcoming",
    element: <UpcomintEvents />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
