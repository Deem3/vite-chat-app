import React, { useEffect } from "react";
import {ImProfile} from 'react-icons/im'
import { Navbar, Button } from "flowbite-react";
import {HiChatAlt2, HiUser, HiInformationCircle} from 'react-icons/hi'
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from '../components/support/Loading'


export default function MyNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [signOut, loading, error] = useSignOut(auth);
  const handleClick = () => {
    signOut()
    sessionStorage.removeItem('user')
  }
  if(loading){
    return <Loading/>
  }
  // If everything is ok
  return (
    <div>
      <Navbar fluid={true} rounded={true} className='shadow-lg rounded-b-xl shadow-blue-200'>
        <Navbar.Brand href="https://vite-chat-app-deem3.vercel.app/">
          <img
            src="zombie.svg"
            className="mr-3 h-10 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-3xl text-slate-600 font-semibold dark:text-white">
            Deem Chat
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button className="bg-slate-600 hover:bg-slate-400 focus:ring-2 focus:ring-slate-400 shadow-md transition-all duration-500" onClick={() => handleClick()}>Logout</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <div className="p-1 border-2 [&>*]:hover:rounded-md [&>*]:p-2 border-slate-400 rounded-lg [&>*]:my-1 [&>*]:mx-1 md:[&>*]:my-0 md:flex md:border-none md:space-x-3 md:p-0 cursor-pointer">
            <p
              className={`flex items-center hover:bg-slate-500 [&>*]:hover:text-white hover:text-white transition-all duration-300 ${location.pathname === '/' ? 'bg-slate-500 rounded-md text-white [&>*]:text-white' : ''}`}
              onClick={() => navigate("/")}
            >
              Chat
              <HiChatAlt2 className="text-slate-600 mx-1 h-5 w-5 transition-all duration-300"/>
            </p>
            <p
              className={`flex items-center hover:bg-slate-500 [&>*]:hover:text-white hover:text-white transition-all duration-300 ${location.pathname === '/profile' ? 'bg-slate-500 rounded-md text-white [&>*]:text-white' : ''}`}
              onClick={() => navigate("/profile")}
            >
              Profile
              <HiUser className="text-slate-600 mx-1 h-5 w-5 transition-all duration-300"/>
            </p>
            <p
              className={`flex items-center hover:bg-slate-500 [&>*]:hover:text-white hover:text-white transition-all duration-300 ${location.pathname === '/about' ? 'bg-slate-500 rounded-md text-white [&>*]:text-white' : ''}`}
              onClick={() => navigate("/about")}
            >
              About
              <HiInformationCircle className="text-slate-600 mx-1 h-5 w-5 transition-all duration-300"/>
            </p>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
