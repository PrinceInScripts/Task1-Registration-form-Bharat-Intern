import { Route, Routes } from "react-router-dom";
import Signup from "./page/Signup/Signup";


function App() {
  return (
    <>
    <Routes>
     
      <Route path="/signup" element={<Signup/>}/>
      
    </Routes>\
    </>
  );
}

export default App;