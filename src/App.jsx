import React, {useEffect} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
// Components
import MyNavbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function App() {
  // checking is there authorized user 
  
  const navigate = useNavigate()
  let [user] = useAuthState(auth)
  const userID = JSON.parse(sessionStorage.getItem('user'))

  
  useEffect(() => {
    if (!user && !userID) {
      navigate("/login");
    }
    if(userID && !user){
      user = userID
    }
  }, [user]);


  return (
    <>
      <div className="bg-blue-100 h-screen min-h-screen">
        <Routes>
          {user ? <><Route path="/" element={<><MyNavbar/><Home/></>}/>
          <Route path="/profile" element={<><MyNavbar/><Profile/></>}/>
          <Route path="/about" element={<><MyNavbar/><About/></>}/></> : null}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}
