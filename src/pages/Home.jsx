import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'

export default function Home() {
  const navigate = useNavigate()
  // const userID = JSON.parse(sessionStorage.getItem(user))
  // console.log(userID)
  const [user] = useAuthState(auth)
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  }, [user])

  if(user){
    return (
      <div>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
      </div>
    )
  }
}
