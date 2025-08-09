import React from 'react'
import Link from 'next/link'


function Navbar() {
  return (
<>
    <div className='w-full hidden md:block '>
        <div className=' flex items-center justify-between p-2'>

        <div className='w-[20%] '>Hotel.com</div>
        <div className='w-[40%]  gap-6 flex items-center justify-between p-2'>
            <Link href="https://hotel-booking-six-psi.vercel.app/">Rooms</Link>

            <Link href="https://hotel-booking-six-psi.vercel.app/">Sevices</Link>
            
            <Link href="https://hotel-booking-six-psi.vercel.app/">Feedback</Link>
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