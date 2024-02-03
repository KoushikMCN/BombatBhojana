"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
  const [items, setItems] = useState([])
  const [starters, setStarters] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr);
      let result = itemsArr.filter(item => item.category === 'Starters')
      setStarters(result)
    })

  }, [])
  // const handleChange = (a, index) => {
  //   Starters[{ index }].quantity = Starters[{ index }].quantity + a
  // }

  return (
    <div>
      <h1 className="text-center text-3xl uppercase p-4 bg-red-600 text-white">Starters</h1>
      <div className='sticky top-0 '>
        <img src='\images\starters.jpg' className='-z-1 absolute top-0 opacity-40' />
      </div>
      <ul>
        <li>
          {
            starters.map((starter, index) => (
              <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-indigo-950 rounded-lg bg-orange-400/30'>
                <div>
                  <p className='text-2xl uppercase bg-slate-100/50 rounded-lg p-1'>{starter.name}</p> <br />
                  <p className='text-blue-600'>Calories: {starter.calories}cal.</p>
                  <p className='text-rose-600'>Price: &#8377;{starter.price}</p>
                  <p className='text-xl'>Quantity:
                    <span>{starter.quantity}</span>
                    <button
                      // onClick={() => handleChange(+1, index)}
                    >
                      +
                    </button>
                  </p>
                </div>
                <img src={starter.link} alt='img' className='h-full w-52 p-0 absolute right-0 top-0 rounded-r-lg ' />
              </div>
            )
            )
          }
        </li>
      </ul>
    </div>
  )
}

export default page