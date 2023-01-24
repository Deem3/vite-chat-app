import React, { useState } from "react";
// style
import { Avatar, Button, Spinner } from "flowbite-react";
import {
  pcMain,
  pcAbout,
  pcDetail,
  pcGridMap,
} from "../components/support/Styling";

// firebase
import { EmailAuthCredential, signInWithCredential } from "firebase/auth";
import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'
import { auth } from "../../utils/firebase";
import {
  useAuthState,
  useUpdateProfile,
  useUpdatePassword,
  useUpdateEmail,
  useDeleteUser,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";

export default function Profile() {
  let [user] = useAuthState(auth);
  // checking
  const [userNameClicked, setUserNameClicked] = useState(false);
  const [userEmailClicked, setUserEmailClicked] = useState(false);
  const [userPasswordClicked, setUserPasswordClicked] = useState(false);

  // firebase
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [deleteUser, loading] = useDeleteUser(auth)
  const [updateEmail] = useUpdateEmail(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const [updatePassword] = useUpdatePassword(auth);

  // change Profile
  const [userName, setUserName] = useState(user.displayName);
  const handleName = (e) => {
    updateProfile({ displayName: userName });
    setUserNameClicked(false);
  };

  // change email
  const [userEmail, setUserEmail] = useState(user.email);
  const handleEmail = async () => {
    const success = await updateEmail(user,{ email: userEmail });
    console.log(success);
    setUserEmailClicked(false);
  };

  // handle email verification
  const handleVerify = async () => {
    const success = await sendEmailVerification(user);
    if (success) {
      console.log("success sent mail");
    }
  };

  // handle password change
  const [userPassword, setUserPassword] = useState("");
  const handlePassword = async () => {
      try {
    const credential =  await firebase.auth.EmailAuthProvider.credential(user.email, prompt('Verify by your password'))
    const result =  await signInWithCredential(auth, credential)
    if(result.user){
      const pass = await updatePassword(user, userPassword)
        .then((res)=>{
          if(res){alert(res)}
        })
        .catch((err)=>{
          alert(err)
          console.log(err)
        })
        alert(pass)
    }
      } catch (err) {
        alert(err)
        console.log(err)
      }
      
    setUserPasswordClicked(false);
  };
  // handle delete user
  const handleDelete = async () => {
    const success = await deleteUser()
    console.log(success)
    if(success){
      sessionStorage.removeItem('user')
    }
    if(!success){
      alert('something went wrong')
    }
  }



  
  return (
    <div className={`${pcMain} bg-red-100`}>
      <div className={pcAbout}>
        <Avatar rounded={true} img={user.photoURL} size="xl" />
        <h1>{updating ? <Spinner /> : user.displayName}</h1>
        <Button className="hover:bg-slate-400 transition-all duration-[400ms]">
          Update Profile Picture
        </Button>
      </div>
      <div className={pcDetail}>
        <p className="sm:my-12 sm:text-2xl sm:font-semibold">Profile</p>
        <div className="sm:grid">
          {/* userName change */}

          <div className={pcGridMap}>
            <p>Username</p>
            <input
              className="focus:outline-none focus:ring-0 border-none bg-transparent p-0"
              type="text"
              value={userName}
              disabled={userNameClicked ? false : true}
              onChange={(e) => setUserName(e.target.value)}
            />
            {userNameClicked ? (
              <p
                onClick={(e) => handleName(e)}
                className="text-blue-500 cursor-pointer hover:text-blue-300"
              >
                change
              </p>
            ) : (
              <p
                onClick={() => setUserNameClicked(true)}
                className="text-blue-500 cursor-pointer hover:text-blue-300"
              >
                {updating ? <Spinner color="info" /> : "edit"}
              </p>
            )}
          </div>
          {/* Email change */}
          <div className={pcGridMap}>
            <p>Email</p>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={userEmailClicked ? false : true}
              className="focus:outline-none focus:ring-0 border-none bg-transparent p-0"
            />
            {userEmailClicked ? (
              <p
                className="hover:text-blue-300 text-blue-500 cursor-pointer"
                onClick={() => handleEmail()}
              >
                change
              </p>
            ) : (
              <p
                className="text-blue-500 hover:text-blue-300 cursor-pointer"
                onClick={() => setUserEmailClicked(true)}
              >
                {updating ? <Spinner color="info" /> : "edit"}
              </p>
            )}
          </div>
          {/* Email verification */}
          <div className={pcGridMap}>
            <p>Email verified</p>
            <p>{user.emailVerified ? "verified" : "not verified"}</p>
            <p
              className="text-blue-500 hover:text-blue-300 cursor-pointer"
              onClick={() => handleVerify()}
            >
              {sending ? <Spinner color="info" /> : null}
              {user.emailVerified ? null : "verify"}
            </p>
          </div>
          {/* password change */}
          {user.providerData[0].providerId === "password" ? (
            <div className={pcGridMap}>
              <p>Password</p>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                disabled={userPasswordClicked ? false : true}
                className="focus:outline-none focus:ring-0 border-none bg-transparent p-0"
              />
              {/* user.providerData[0].providerId */}
              {userPasswordClicked ? (
                <p
                  className="cursor-pointer text-blue-500 hover:text-blue-300"
                  onClick={() => handlePassword()}
                >
                  change
                </p>
              ) : (
                <p
                  className="cursor-pointer text-blue-500 hover:text-blue-300"
                  onClick={() => setUserPasswordClicked(true)}
                >
                  {updating ? <Spinner color="info" /> : 'edit'}
                </p>
              )}
            </div>
          ) : null}

          {/* delete account */}
          <Button onClick={()=>handleDelete()} className="sm:my-6 bg-red-600 focus:ring-red-400 hover:bg-red-400">
            {loading ? <Spinner color="failure"/> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
