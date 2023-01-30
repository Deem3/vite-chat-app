import React, { useState, useRef } from "react";

// style
import { Avatar, Button, Spinner } from "flowbite-react";
// pc display size
import {
  pcMain,
  pcAbout,
  pcDetail,
  pcGridMap,
} from "../components/support/Styling";
// mobile display size
import {
  mbAbout,
  mbDetail,
  mbGridMap
} from '../components/support/Styling'
import {GoVerified} from 'react-icons/go'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// firebase
import { signInWithCredential } from "firebase/auth";
import {doc, updateDoc, deleteDoc} from 'firebase/firestore' 
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { auth, storage, db } from "../utils/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import {
  useAuthState,
  useUpdateProfile,
  useUpdateEmail,
  useDeleteUser,
  useSendEmailVerification,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";

export default function Profile() {
  let [user] = useAuthState(auth);
  // checking
  const [userNameClicked, setUserNameClicked] = useState(false);
  const [userEmailClicked, setUserEmailClicked] = useState(false);

  // firebase
  const [updateProfile, updating] = useUpdateProfile(auth);
  const [deleteUser, loading] = useDeleteUser(auth);
  const [updateEmail, updateing] = useUpdateEmail(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const [sendPasswordResetEmail, error] = useSendPasswordResetEmail(auth);

  // change Profile
  const [userName, setUserName] = useState(user.displayName);
  const handleName = async(e) => {
    await updateProfile({ displayName: userName }).then(async()=>{
      await updateDoc(doc(db, 'user', user.uid),{
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
      toast.success('Username Changed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }).catch((error)=>{
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
    setUserNameClicked(false);
  };

  // change email
  const [userEmail, setUserEmail] = useState(user.email);
  const handleEmail = async () => {
    try {
      const credential = await firebase.auth.EmailAuthProvider.credential(user.email, prompt('enter your password please'))
      const result = await signInWithCredential(auth, credential).then((succ)=>{
        updateEmail(auth.currentUser, {email: userEmail}).then((res)=>alert('success')).catch((error)=>alert(error))
      }).catch((error)=>alert(error))
    } catch (error) {
      
    }
    setUserEmailClicked(false);
  };

  // handle email verification
  const handleVerify = () => {
    sendEmailVerification(user)
      .then((success)=>{
        toast.success('Verification email sent', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch((error)=>{
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
  };

  // handleReset
  const handleReset = () => {
    sendPasswordResetEmail(user.email)
      .then((success) => {
        alert('success')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle delete user
  
  const handleDelete = async () => {
    try {
      const credential = await firebase.auth.EmailAuthProvider.credential(
        user.email,
        prompt("Verify by your password")
      );
      await signInWithCredential(auth, credential)
        .then(async(userCredential)=>{
          await deleteDoc(doc(db, 'user', user.uid))
          await deleteUser()
            .then((res) => {
              toast.success('Account deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              
              sessionStorage.removeItem("user");
            })
        })
          
            .catch((error) => toast.error(error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
              }));
      }catch (error) {
        toast.error('something went wrong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    };

  // useref

  const fileInput = useRef(null)

  // update profile picture
const handleUpload = () => {
  fileInput.current.click()
}    

const handleFileChange = async(e) =>{
  const file = e.target.files[0]
  try {
    const storageRef = ref(storage, user.email)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      (error) => {
        toast.error('something went wrong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
          await updateProfile({photoURL: downloadURL})
          await updateDoc(doc(db, 'user', user.uid),{
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: downloadURL
          })
          toast.success('Profile successfuly updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        });
      }
    )
  } catch (error) {
    toast.error('something went wrong!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}

  // main render

  return (
    <div className={`${pcMain}`}>
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
      <div className={`${pcAbout} ${mbAbout}`}>
        {updating ? <Spinner size="xl"/> : <Avatar rounded={true} img={user.photoURL} size="xl" />}
        <h1>{updating ? <Spinner /> : user.displayName}</h1>
        <Button className="hover:bg-slate-400 transition-all duration-[400ms] bg-slate-600 mb-10" onClick={handleUpload}>
          Update Profile Picture
        </Button>
        <input type="file" className="hidden" ref={fileInput} onChange={(e)=>handleFileChange(e)}/>
      </div>
      <div className={`${pcDetail} ${mbDetail}`}>
        <p className="sm:my-12 sm:text-2xl sm:font-semibold">Profile</p>
        <div className="sm:grid">
          {/* userName change */}

          <div className={`${pcGridMap} ${mbGridMap}`}>
            <p className="text-start">Username</p>
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
          <div className={`${pcGridMap} ${mbGridMap}`}>
            <p className="text-start">Email</p>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={userEmailClicked ? false : true}
              className="focus:outline-none focus:ring-0 border-none bg-transparent p-0"
            />
            {userEmailClicked ? (
              <div
                className="hover:text-blue-300 text-blue-500 cursor-pointer"
                onClick={() => handleEmail()}
              >
                change
              </div>
            ) : (
              <div
                className="text-blue-500 hover:text-blue-300 cursor-pointer"
                onClick={() => setUserEmailClicked(true)}
              >
                {updateing ? <Spinner color="info" /> : "edit"}
              </div>
            )}
          </div>
          {/* Email verification */}
          <div className={`${pcGridMap} ${mbGridMap}`}>
            <p className="text-start">Verified</p>
            <p className="text-start">{user.emailVerified ? "verified" : "not verified"}</p>
            <button
              className={`${user.emailVerified ? "text-blue-500" : "text-blue-500 hover:text-blue-300 cursor-pointer "} flex items-center justify-end`}
              onClick={() => handleVerify()}
              disabled={user.emailVerified ? true : false}
            >
              {user.emailVerified ? <GoVerified/> : <p>{sending ? <Spinner color="info" /> : 'verify'}</p>}
            </button>
          </div>
          {/* password reset */}
          {user.providerData[0].providerId === "password" ? (
            <div className={`${pcGridMap} ${mbGridMap}`}>
              <p className="text-start">Password</p>
              <p></p>
              <p
                className="text-blue-500 hover:text-blue-300 cursor-pointer"
                onClick={() => handleReset()}
              >
                reset
              </p>
            </div>
          ) : null}

          {/* delete account */}
          <Button
          disabled={user.providerData[0].providerId === 'google.com' ? true : false}
            onClick={() => handleDelete()}
            className="sm:my-6 bg-red-600 focus:ring-red-400 hover:bg-red-400 w-full mt-4 disabled:bg-red-600 disabled:hover:bg-red-600"
          >
            {loading ? <Spinner color="failure" /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
