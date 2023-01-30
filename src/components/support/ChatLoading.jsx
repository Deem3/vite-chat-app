import React from "react";

// firebase
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// styling
import { Avatar } from "flowbite-react";
import {FiSend} from 'react-icons/fi'

const Message = () => {
  return (
    <>
      <div className="flex  justify-start">
        <p className="bg-green-100 w-fit p-2 rounded-lg">message</p>
      </div>
      <div className="flex  justify-end">
        <p className="bg-blue-100 w-fit p-2 rounded-lg">message from friend</p>
      </div>
    </>
  );
};

export default function Chat() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="bg-white rounded-lg shadow-xl container mx-auto mt-12 h-[75vh] w-[32vw] border-2 border-slate-500 overflow-hidden">
      <div className="bg-white h-16 border-b-2 border-slate-500 shadow-lg flex justify-start items-center">
        <Avatar rounded="3xl" img={user.photoURL} className="ml-6 mr-6" />
        <h1 className="text-slate-500 text-3xl font-semibold capitalize">
          {user.displayName}
        </h1>
      </div>
      <div className="h-[541px] p-2 overflow-scroll scrollbar-hide bg-white">
        <Message/>
      </div>
      <div className="h-[50px] bg-red-100 border-t-2 border-slate-500 relative">
        <input type="text" className="w-full h-full overflow-hidden focus:ring-transparent focus:outline-none focus:border-none border-none" />
        <FiSend className="absolute text-slate-500 hover:text-slate-400 right-3 top-2 text-3xl cursor-pointer"/>
      </div>
    </div>
  );
}
