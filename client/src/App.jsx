
import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "./page/Signup/Signup"



function App() {
  useEffect(()=>{
    
  })
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      
      
    </Routes>
  );
}

export default App;