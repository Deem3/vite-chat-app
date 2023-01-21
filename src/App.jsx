import React from 'react'
import {Route, Routes} from 'react-router-dom'
// pages
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}
