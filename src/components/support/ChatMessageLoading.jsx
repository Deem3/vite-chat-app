import React from 'react'
import { Avatar } from 'flowbite-react'

export default function ChatMessageLoading() {
  return (
        <div
          role="status"
          className="animate-pulse bg-sky-100 min-h-[4rem] max-h-[7rem] flex items-center rounded-lg shadow-md [&>*]:mx-2 mb-2 transition-all duration-500"
        >
          <Avatar
            rounded="3xl"
            
          />
          <div className="mt-2">
            <p className="font-semibold h-3 w-[10rem] bg-gray-200 rounded-full dark:bg-gray-700 mb-4">
            </p>
            <p className="h-2 w-[20rem] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></p>
          </div>
        </div>
  )
}
