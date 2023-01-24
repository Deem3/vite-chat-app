import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  let [user] = useAuthState(auth);
  
  if (user) {
    return <div className="bg-blue-100 h-full">Home</div>;
  }
}
