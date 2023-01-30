import React from "react";
import { Link } from "react-router-dom";
import ChatMessageLoading from "../support/ChatMessageLoading";
// firebase
import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { collection, orderBy, limit, query } from "firebase/firestore";

// styling
import { Avatar, Badge } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";

export default function ChatMember() {
  const [user] = useAuthState(auth);

  const [snapshot, loading] = useCollection(collection(db, `chats`));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  // get latest message
  // if(chats){
  //   const q = query(collection(db, `chats/${{chats}}/chat`), orderBy("timestamp", "desc"), limit(1));
  //   const [latestMsg] = useCollectionData(q)
  //   console.log(latestMsg)
  // }

  if (loading) {
    return (
      <>
        <ChatMessageLoading />
        <ChatMessageLoading />
        <ChatMessageLoading />
        <ChatMessageLoading />
        <ChatMessageLoading />
        <ChatMessageLoading />
        <ChatMessageLoading />
        <ChatMessageLoading />
      </>
    );
  }

  return chats?.map((chat) => {
    if (chat.id.includes(user.uid)) {
      return (
        <>
          {!user.emailVerified ? <Badge className="container mx-center text-center items-center" color="failure">Your account hasn't been verified thus you can not be able to send a message</Badge> : null}
          <Link
            to={user.emailVerified ? chat.id : null}
            key={Math.random()}
            className="bg-sky-100 min-h-[4rem] max-h-[7rem] flex items-center rounded-lg shadow-md [&>*]:mx-2 cursor-pointer mb-2 hover:bg-blue-300 transition-all duration-500"
          >
            <Avatar
              rounded="3xl"
              img={
                user.photoURL === chat.photoURL[0]
                  ? chat.photoURL[1]
                  : chat.photoURL[0]
              }
            />
            <div>
              <p className="font-semibold">
                {user.displayName === chat.displayName[0]
                  ? chat.displayName[1]
                  : chat.displayName[0]}
              </p>
              {/* <p>{latestMsg[0].msg}</p> */}
              {}
            </div>
          </Link>
        </>
      );
    }
  });
}
