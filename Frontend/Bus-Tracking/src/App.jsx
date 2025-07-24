import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Contactus from "./pages/Contactus";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Loginpages";
import Admin from "./pages/Adminpage";
import User from "./pages/Userpage";
import Driver from "./pages/Driverpage";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Routes>
      <Route path="/about" element={<AboutUs/>}/>
      <Route path="/" element={<Homepage />} />
      <Route path="/contact" element={<Contactus />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/user" element={<User/>}/> 
      <Route path="/driver" element={<Driver/>}/>
    </Routes>
  );
}

export default App;
