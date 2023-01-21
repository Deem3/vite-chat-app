import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
// Firebase
import {auth} from '../../utils/firebase'
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
// Context
import {useLoading} from '../../utils/context/LoadingContext'


export default function GoogleButton() {
  const navigate = useNavigate()
  const {isLoading, setIsLoading} = useLoading()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)


  const handleClick = () => {
    signInWithGoogle()
    .then((user)=>{
      setIsLoading(false)
      if(user){
        navigate('/')
      }
    })
    .catch((err)=>{
      setIsLoading(false)
    })
  }

  
  useEffect(()=>{
    setIsLoading(loading)
  }, [loading])


  return (
    <>
      <button
      onClick={()=>handleClick()}
        type="button"
        className="w-full h-[2.5rem] justify-centertext-white bg-gray-50 border border-gray-300 hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 disabled:hover:bg-gray-300 group flex items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"
      >
        <FcGoogle className="h-6 w-6"/>
      </button>
    </>
  );
}
