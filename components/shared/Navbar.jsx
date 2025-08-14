import React from 'react'
import Link from 'next/link'


function Navbar() {
  return (
<>
    <div className='w-full hidden md:block '>
        <div className=' flex items-center justify-between p-2'>

        <div className='w-[20%] '>
          <Link href="/"> Hotel.com</Link></div>
        <div className='w-[40%]  gap-6 flex items-center justify-between p-2'>
            <Link href="/">Rooms</Link>

            <Link href="/">Sevices</Link>
            
            <Link href="/">Feedback</Link>
        </div>
        </div>
    </div>

    <div className='w-full md:hidden flex '>
      <div>
        Hotel.com
      </div>
    </div>
</>
  )
}

export default Navbar