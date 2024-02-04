'use-client'
import React from 'react'
import Header from '../../components/Header'


const Menu = () => {
    return (
        <div className=' flex flex-col justify-center'>
            <Header />
            <h1 className='text-center text-2xl p-4'>Menu</h1>
            <div className='grid grid-cols-3'>
                <div className='flex flex-col mx-auto my-5 border-2 border-sky-900 rounded-xl w-2/3 justify-center items-center'>
                    <a href='\Menu\Starters'><img src='\images\starters.jpg' alt='starters' className='h-56 w-max rounded-t-xl p-0' />

                        <p className='text-xl text-center uppercase p-3'>Starters</p></a>
                </div>
                <div className='flex flex-col mx-auto my-5 border-2 border-sky-900 rounded-xl w-2/3 justify-center items-center'>
                    <a href='\Menu\MainCourse'><img src='\images\mainCourse.jpg' alt='starters' className='h-56 w-max rounded-t-xl p-0' />

                        <p className='text-xl text-center uppercase p-3'>Main Course</p></a>
                </div>
                <div className='flex flex-col mx-auto my-5 border-2 border-sky-900 rounded-xl w-2/3 justify-center items-center'>
                    <a href='\Menu\Chaats'><img src='\images\chaats.jpg' alt='starters' className='h-56 w-max p-0 rounded-t-xl' />

                        <p className='text-xl text-center uppercase p-3'>Chaats</p></a>
                </div>
                <div className='flex flex-col mx-auto my-5 border-2 border-sky-900 rounded-xl w-2/3 justify-center items-center'>
                    <a href='\Menu\Desserts'><img src='\images\desserts.jpg' alt='starters' className='h-56 w-max rounded-t-xl p-0' />

                        <p className='text-xl text-center uppercase p-3'>Desserts</p></a>
                </div>
                <div className='flex flex-col mx-auto my-5 border-2 border-sky-900 rounded-xl w-2/3 justify-center items-center'>
                    <a href='\Menu\Drinks'><img src='\images\drinks.jpg' alt='starters' className='h-56 w-max rounded-t-xl p-0' />

                        <p className='text-xl text-center uppercase p-3'>Drinks</p></a>
                </div>
            </div>
            {/* <button className='p-4 border-2 border-slate-500 rounded-xl m-4 mx-auto bg-purple-700 w-max'><a href='../Bill'>YOUR BILL</a></button> */}
        </div>
    )
}

export default Menu