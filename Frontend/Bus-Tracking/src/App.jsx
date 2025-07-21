import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Contactus from "./pages/Contactus";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Loginpages";

function App() {
  return (
    <Routes>
      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/" element={<Homepage />} />
      <Route path="/contact" element={<Contactus />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
