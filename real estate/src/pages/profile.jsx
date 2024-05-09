import React from 'react'

export default function Profile() {
  return (
    <div>
      
      <div className='flex flex-col mt-11'>
      <h1 className='border-4 border-green-400 mb:5'>
        Profile
        </h1>
        <h2 className=''>Eugene</h2>
         
         {/* typography*/}
        <h1 className='text-3xl italic underline decoration-red-600 underline-offset-8'>
          Title 1
          </h1>
        <p className=' text-base note truncate'>A little note and a long sentece to describe how to trancend in tailwind css so please be long enough</p>
         <label className='text-3xl' aria-placeholder='username'></label>
      </div>

      {/*spaces and sizes*/ }
      <div className=' flex '>
        <div className='w-1/4 bg-red-400'></div>
        <div className=' bg-slate-500 w-3/4'>another div</div>
        </div> 

        {/*flex*/}
        <div className=' Parent'>
          <div>Header</div>
          <div className='flex flex-col md:flex-row  '>
          <div className='basis-2/4 bg-red-200'>Main content</div>
          <div className='basis-1/4 bg-sky-300'>Sidebar</div>
          <div className='basis-1/4 bg-gray-600'>Menu</div>
          </div>
        
        </div>

        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-wrap w-full'>
          <div className='w-32 grow'>1</div>
          <div className='w-32 grow'>2</div>
          <div className='w-32 grow'>3</div>
          <div className='w-32 grow'>4</div>
          </div>
        </div>

        {/*justify content*/}
        <div className='Parent'>
          <div>Header</div>
          <div className='flex justify-evenly'>
            <div>sidebar</div>
            <div>
              <h1>Main content</h1>
              <p></p>
              </div>
            <div>Another container</div>
          </div>

        </div>
        {/*Grids*/}
        <div className='h-screen text-white parent bg-slate-400'>
          <div className='Container mx-auto'>
            <div className='grid grid-cols-6 gap-4'>
              <div className='p-4 col-span-4 col-start-2 bg-sky-500 rounded-lg'>01</div>
              <div className='p-4 col-start-1 col-end-3 bg-sky-500 rounded-lg'>02</div>
              <div className='p-4 col-span-2 col-end-7 bg-sky-500 rounded-lg'>03</div>
              <div className='p-4 col-start-1 col-end-7 bg-sky-500 rounded-lg'>04</div>
            </div>
          </div>

          {/*layout*/}
          <div className='h-64 text-white-300 bg-blue-600 overscroll-auto '>
            <div className="container  px-2">
              <img className=' w-64 float-left'
              src='./src/assets/profilepic.jpeg'></img>
            
              <img className=' w-32 float-right'
              src='./src/assets/profilepic.jpeg'></img>
             <p className="clear-right">
              The code in a source file stored on the disk must be translated into machine language. 
              This is the job of the compiler. The Compiler is a computer program that translates the source 
              code written in a high-level language into the corresponding object code of the low-level 
              language. This translation process is called compilation. The entire high level program is 
              converted into the executable machine code file.
              </p>
              <p>
              The code in a source file stored on the disk must be translated into machine language. 
              This is the job of the compiler. The Compiler is a computer program that translates the source 
              code written in a high-level language into the corresponding object code of the low-level 
              language. This translation process is called compilation. The entire high level program is 
              converted into the executable machine code file.
              </p>
              <p>
              The code in a source file stored on the disk must be translated into machine language. 
              This is the job of the compiler. The Compiler is a computer program that translates the source 
              code written in a high-level language into the corresponding object code of the low-level 
              language. This translation process is called compilation. The entire high level program is 
              converted into the executable machine code file.
              </p>

            </div>
          </div>
           

        </div>

        <div className='h-screen text-white Parent bg-slate-300'>
          <div className='container px-2'>
            <div className='relative h-32 w-32 p-8 bg-red-500 rounded-lg'>
              <div className="absolute  w-24 inset-0 h-24 bg-green-500"></div>
            </div>
          </div>

        </div>

        <div className='text-white bg-slate-400 Parent h-screen '>
          <div className='container flex'>
            <div className='bg-red-500 z-40 p-3 border-white rounded -full h-16 '>05</div>
            <div className='bg-red-500 z-30 p-3 border-white rounded -full'>04</div>
            <div className='bg-red-500 z-20 p-3 border-white rounded -full'>03</div>
            <div className='bg-red-500 z-10 p-3 border-white rounded -full'>02</div>
            <div className='bg-red-500 z-0 p-3  border-white rounded -full'>01</div>
          
          </div>

        </div>
        <div className='w-full h-full bg-red-300'>
          <img src='./src/assets/profilepic.jpeg' className='object-cover object-contain md:object-scale-down'/>
        </div>

    </div>
  ) 
}
