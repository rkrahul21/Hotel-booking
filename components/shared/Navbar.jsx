import React from 'react'
import Link from 'next/link'


function Navbar() {
  return (
<>
    <div className='w-full hidden md:block '>
        <div className=' flex items-center justify-between p-2'>

        <div className='w-[20%] '>Hotel.com</div>
        <div className='w-[40%]  gap-6 flex items-center justify-between p-2'>
            <Link href="http://localhost:3000/">Rooms</Link>

            <Link href="http://localhost:3000/">Sevices</Link>
            
            <Link href="http://localhost:3000/">Feedback</Link>
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