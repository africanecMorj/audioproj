import React from 'react'

export default function Auth() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900'>
        <form action="" className='w-4/10 dark:bg-gray-800 bg-white h-5/6 flex flex-col items-center rounded-sm shadow-xl p-10'>
            <h1 className='text-gray-500 dark:text-white self-start my-10 text-2xl font-semibold mt-0'>Sign in to your account</h1>
            <h4 className='text-gray-500 dark:text-white text-xl   self-start mt-5 font-semibold'>Your email</h4>
            <input type="text" placeholder='Login' className='rounded-sm w-full bg-gray-500 text-gray-900 dark:text-white outline-none p-3.5 text-sm font-normal m-5 border-solid border-gray-300 border-1' />
            <h4 className='text-gray-500 dark:text-white  text-xl self-start mt-15  font-semibold'>Your password</h4>
            <input type="text" placeholder='Password' className='rounded-sm w-full bg-gray-500 text-gray-900 dark:text-white outline-none p-3.5 text-sm font-normal m-5 border-solid border-gray-300 border-1'/>
            <button className='m-5 rounded-sm w-6/18 bg-blue-600 text-gray-500 dark:text-white outline-none p-3.5 text-sm font-normal border-solid border-gray-300 border-1'>Send</button>
        </form>
    </div>
  )
}
