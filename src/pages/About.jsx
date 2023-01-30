import React from 'react'
// styling
import {
  pcMainAbout,
  pcDetailAbout
} from '../components/support/Styling'

import {
  mbMainAbout,
  mbDetailAbout
} from '../components/support/Styling'
import {BsGithub} from 'react-icons/bs'
import {IoLogoVercel}from 'react-icons/io5'


export default function About() {
  return (
    <div className={`${pcMainAbout} ${mbMainAbout}`}> 
      <div className={`${pcDetailAbout} ${mbDetailAbout}`}>
        <a target='_blank' rel="noopener" href="https://github.com/Deem3/vite-chat-app" className='flex flex-col justify-center items-center text-slate-600 hover:text-slate-400 cursor-pointer text-xl transition-all duration-[550ms]'>
        <BsGithub className='h-40 w-40 mb-12'/>
        You can view project from github
        </a>
          <div className='flex items-center mt-24'>deployed on<br/>
          <IoLogoVercel className='ml-2'/>
           Vercel</div>
      </div>
    </div>
  )
}
