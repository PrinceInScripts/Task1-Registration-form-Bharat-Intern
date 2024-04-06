
import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "./page/Signup/Signup"
import Login from "./page/Login/Login";
import ForgotPassword from "./page/ForgotPassword/forgotPassword";



function App() {
  useEffect(()=>{
    
  })
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      
    </Routes>
  );
}

export default App;