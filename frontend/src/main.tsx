import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import UpcomingEvents from "./UpcomingEvents.tsx";
import PrivacyPolicy from "./PrivacyPolicy.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import "./i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DateConverter from "./DateConverter.tsx";
import { Toaster } from "react-hot-toast";
import About from "./About.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming" element={<UpcomingEvents />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/converter" element={<DateConverter />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Toaster position="bottom-center" />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
