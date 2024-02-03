"use client"
import React from 'react'
import Header from '@/components/Header'

const page = () => {
    return (
        <main>
            <Header />
            <div className='grid place-items-center'>
                <a href='/Restaurant/addItems' className='uppercase'>Add New Items</a>
                <a href='/Restaurant/Items' className='uppercase'>Items</a>
                <a href='/Restaurant/orders' className='uppercase'>Orders</a>
            </div>
        </main>
    )
}

export default page