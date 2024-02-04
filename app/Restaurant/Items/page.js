"use client"
import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { collection, getDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const q = query(collection(db, 'items'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = []
            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id })
            })
            setItems(itemsArr);
        })

    }, [])

    return (
        <div>
            <Header />
            <ul>
                {
                    items.map((items) => (
                        <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-indigo-950 rounded-lg bg-sky-400/30'>
                            <div>
                                <p className='text-2xl uppercase bg-slate-100/50 rounded-lg p-1'>{items.name}</p> <br />
                                <p className='text-blue-600'>Calories: {items.calories}cal.</p>
                                <p className='text-rose-600'>Price: &#8377;{items.price}</p>
                            </div>
                            <img src={items.link} alt='img' className='h-full w-52 p-0 absolute right-0 top-0 rounded-r-lg ' />
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default page