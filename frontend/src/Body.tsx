import DateConverter from "./pages/DateConverter.tsx";
import About from "./pages/About.tsx";
import { DarkModeContext } from "./components/DarkModeProvider.tsx";
import Home from "./pages/Home.tsx";
import UpcomingEvents from "./pages/UpcomingEvents.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import { useContext } from "react";

const Body = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<UpcomingEvents />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/converter" element={<DateConverter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Body;
