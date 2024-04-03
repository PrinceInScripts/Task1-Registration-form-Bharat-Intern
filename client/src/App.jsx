
import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "./page/Signup/Signup"
import Login from "./page/Login/Login";



function App() {
  useEffect(()=>{
    
  })
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      
    </Routes>
  );
}

export default App;