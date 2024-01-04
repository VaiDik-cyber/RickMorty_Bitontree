import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import NavEpisode from "./components/NavEpisode/NavEpisode";
import Navbar from "./components/Navigation/Navbar";
import NavLocation from "./components/NavLocation/NavLocation";
import "./App.css";

function App() {
  return (
    <div className="app-container mt-3.8% md:mt-12% sm:mt-20%">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/characters" element={<Home />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="episode/:id" element={<NavEpisode />} />
        <Route path="/locations" element={<NavLocation />} />
      </Routes>
    </div>
  );
}

export default App;
