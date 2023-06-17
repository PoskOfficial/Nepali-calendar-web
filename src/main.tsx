import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import UpcomintEvents from "./UpcomingEvents.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<UpcomintEvents />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
