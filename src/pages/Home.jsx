import React, { useState } from "react";
// components
import ChatMember from "../components/chatSection/ChatMember";
import Loading from "../components/support/Loading";

// styling
import { Avatar } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [user, userLoading, error] = useAuthState(auth);

  const [snapshot] = useCollection(collection(db, 'user'))
  // search section

  const handleSearch = async (e) => {
    // data from user collection
    const userEmails = snapshot?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    userEmails?.map((userEmail) => {
      if (userEmail.email === email && email !== user.email) {
        setDoc(doc(db, "chats", userEmail.uid + user.uid), {
          displayName: [userEmail.displayName, user.displayName],
          email: [userEmail.email, user.email],
          photoURL: [userEmail.photoURL, user.photoURL],
        });
      }
    });
  };

  // handle key down
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl container mx-auto mt-12 h-[75vh] w-[32vw] border-2 border-slate-500 overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="bg-white h-16 border-b-2 border-slate-500 shadow-lg flex justify-between items-center">
        <div className="flex items-center">
          <Avatar rounded="3xl" img={user.photoURL} className="ml-6 mr-6" />
          <h1 className="text-slate-500 text-3xl font-semibold capitalize truncate whitespace-no-wrap">
            {user.displayName}
          </h1>
        </div>
        <div className="flex items-center">
          <input
            type="email"
            className="rounded-lg border-none w-40"
            placeholder="add friend"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKey}
          />
          <HiUserAdd
            className="text-3xl text-slate-500 hover:text-slate-400 cursor-pointer mr-6 transition-all duration-500"
            onClick={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <div className="bg-white h-[591px] p-2 overflow-scroll scrollbar-hide">
        <ChatMember />
      </div>
    </div>
  );
}
