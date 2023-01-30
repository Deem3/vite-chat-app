import React, { useState } from "react";
import { useParams } from "react-router-dom";

// crypto js for encryption
import {AES, enc} from 'crypto-js'

// firebase
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../utils/firebase";
import {
  useCollectionData,
  useCollection
} from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

// styling
import { Avatar } from "flowbite-react";
import { FiSend } from "react-icons/fi";
import {mbChatMain} from '../components/support/Styling'



{/*---------------------------------------start of Chat----------------------------------------*/}


export default function Chat() {

  // secret password for crypto.js
  const password = ")*JdxxkKDt5ZZ+g4uUbUmJZ^n$@yN^&k"
  
  const [user, loading, error] = useAuthState(auth);
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  // get messages
  const q = query(collection(db, `chats/${id}/chat`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);

  // get name bar and avatar
  const [snapshot] = useCollection(collection(db, `chats`));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  
  // send Messages
  const handleSend = async (e) => {
    const encryptedMsg = AES.encrypt(msg, password).toString()
    const msgRef = collection(db, `chats/${id}/chat`);
    await addDoc(msgRef, {
      msg: encryptedMsg,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setMsg("");
  };
  
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  }

  // get all message and display
  const Message = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      const className = sender ? "flex justify-end" : "flex justify-start";
      const color = sender ? "bg-blue-100 lg rounded-l-lg" : "bg-green-100 rounded-r-lg"
      const bytes = AES.decrypt(msg.msg, password)
      return (
        <>
          <div className={`${className} m-2`}>
            <p key={Math.random()*10} className={`${color} w-fit max-w-[13rem] max-h-[6rem] p-2 shadow-md rounded-b-lg`}>{bytes.toString(enc.Utf8)}</p>
          </div>
        </>
      );
    });

    
  return chats?.map((chat)=>{
    if(id===chat.id)
    return(
      <div className={`bg-white rounded-lg shadow-xl md:container md:mx-auto md:mt-12 md:h-[75vh] md:w-[32vw] md:border-2 md:border-slate-500 overflow-hidden ${mbChatMain}`}>
      <div className="bg-white h-16 border-b-4 border-slate-600 md:border-b-2 md:border-slate-500 shadow-lg flex justify-start items-center">
        <Avatar rounded="3xl" img={chat.photoURL[0] === user.photoURL ? chat.photoURL[1] : chat.photoURL[0]} className="ml-6 mr-6" />
        <h1 className="text-slate-500 text-3xl font-semibold capitalize">
          {chat.displayName === user.displayName[0] ? chat.displayName[1] : chat.displayName[0]}
        </h1>
      </div>
      <div className="h-[541px] p-2 overflow-scroll scrollbar-hide bg-white">
        <Message />
      </div>
      <div className="h-[50px] bg-red-100 border-t-4 border-slate-600 md:border-t-2 md:border-slate-500 relative">
        <input
          type="text"
          className="w-full h-full overflow-hidden focus:ring-transparent focus:outline-none focus:border-none border-none"
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleEnter}
          value={msg}
        />
        <FiSend
          className="absolute text-slate-500 hover:text-slate-400 right-3 top-2 text-3xl cursor-pointer transition-all duration-300"
          onClick={(e) => handleSend(e)}
        />
      </div>
    </div>
)});
}
