import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
// Firebase
import { auth } from '../../../utils/firebase';
import { useCreateUserWithEmailAndPassword,  useUpdateProfile} from 'react-firebase-hooks/auth';
// Components
import Loading from '../../components/support/Loading'
import GoogleButton from '../../components/GoogleButton'
// Context
import { useLoading } from '../../../utils/context/LoadingContext';
// Styles
import { TextInput, Button } from 'flowbite-react';
import {GiRaiseZombie} from 'react-icons/gi'
import {HiMail, HiUser} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'

export default function Register() {
  // global var
  const navigate = useNavigate()
  const {isLoading, setIsLoading} = useLoading()
  const [updateProfile, updating] = useUpdateProfile(auth);
  // create an account with email and password
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    createUserWithEmailAndPassword(email, password)
      .then((user)=>{
        updateProfile({displayName: displayName})
          navigate('/')
          sessionStorage.setItem("user", JSON.stringify(user))
          if(!user){
            sessionStorage.removeItem('user')
          }
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  // when loading
  if(isLoading || loading){
    return <Loading/>
  }
  // if everything is ok render
  return (
    <form className="flex flex-col justify-center items-center h-screen w-screen [&>div]:mb-6 bg-blue-100" onSubmit={(e)=>handleSubmit(e)}>
      <div className="absolute left-2 top-2 flex items-center">
        <GiRaiseZombie className="h-10 w-10 text-slate-600" />
        <p className="text-3xl text-slate-600 font-semibold">Deem Chat</p>
      </div>
      <h1 className="text-2xl font-bold text-slate-600 mb-24">Register</h1>
      <TextInput
        className="w-80"
        id="user"
        type="text"
        icon={HiUser}
        placeholder="Username"
        required={true}
      />
      <TextInput
        className="w-80"
        id="email4"
        type="email"
        icon={HiMail}
        placeholder="Email"
        required={true}
      />
      <TextInput
        className="w-80"
        id="pass"
        type="password"
        icon={RiLockPasswordFill}
        placeholder="Password"
        required={true}
      />
      <div className="w-80 flex flex-col items-center">
        <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-500 ring-slate-500">New User</Button>
        <p>or</p>
        <GoogleButton/>
      </div>
      <Link className="text-slate-700 font-semibold" to="/login">I have an account</Link>
    </form>
  );
}
