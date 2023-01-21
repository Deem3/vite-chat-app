import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
// Components
import Loading from '../../components/support/Loading'
import GoogleButton from '../../components/GoogleButton'
// Context
import { useLoading } from '../../../utils/context/LoadingContext';
// Firebase
import { auth } from '../../../utils/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// Styles
import { TextInput, Button } from 'flowbite-react';
import {GiRaiseZombie} from 'react-icons/gi'
import {HiMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  // global var
  const {isLoading, setIsLoading} = useLoading()
  const navigate = useNavigate()
  // sign in with email and password
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    signInWithEmailAndPassword(email, password)
      .then((user)=>{
        sessionStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      })
      .catch((error)=>console.log(error))
  }
  // when loading
  if(loading || isLoading ){
    return <Loading/>
  }
  // if everything is ok render
  return (
    <form className="flex flex-col justify-center items-center h-screen w-screen [&>div]:mb-6 bg-blue-100" onSubmit={(e)=>handleSubmit(e)}>
      <div className="absolute left-2 top-2 flex items-center">
        <GiRaiseZombie className="h-10 w-10 text-slate-600" />
        <p className="text-3xl text-slate-600 font-semibold">Deem Chat</p>
      </div>
      <h1 className="text-2xl font-bold text-slate-600 mb-24">Login</h1>
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
        <Button type="submit" className="w-full">Login</Button>
        <p>or</p>
        <GoogleButton/>
      </div>
      <Link className="text-slate-700 font-semibold" to="/register">I do not have an account</Link>
    </form>
  );
}
