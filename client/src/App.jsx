
import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "./page/Signup/Signup"
import Login from "./page/Login/Login";
import ForgotPassword from "./page/ForgotPassword/forgotPassword";
import ResetPassword from "./page/ResetPassword/ResetPassword";
import Home from "./page/Home/Home";



function App() {
  useEffect(()=>{
    
  })
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      <Route path="/reset-password/:resetPasswordToken" element={<ResetPassword/>}/>
      
    </Routes>
  );
}

export default App;