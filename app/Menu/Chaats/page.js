"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
  const [items, setItems] = useState([])
  const [chaats, setChaats] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr);
      let result = itemsArr.filter(item => item.category === 'Chaats')
      setChaats(result)
    })

  }, [])
  // const handleChange = (a, index) => {
  //   Chaats[{ index }].quantity = Chaats[{ index }].quantity + a
  // }

  return (
    <div>
      <h1 className="text-center text-3xl uppercase p-4 bg-teal-700 text-white">Chaats</h1>
      <div className='sticky top-0 '>
        <img src='\images\chaats.jpg' className='-z-1 absolute top-0 opacity-40 w-full' />
      </div>
      <ul>
        <li>
          {
            chaats.map((chaat, index) => (
              <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-blue-950 rounded-lg bg-green-400/30'>
                <div>
                  <p className='text-2xl uppercase bg-slate-100/50 rounded-lg p-1'>{chaat.name}</p> <br />
                  <p className='text-blue-600'>Calories: {chaat.calories}cal.</p>
                  <p className='text-rose-600'>Price: &#8377;{chaat.price}</p>
                  <p className='text-xl'>Quantity:
                    <span>{chaat.quantity}</span>
                    <button
                    // onClick={() => handleChange(+1, index)}
                    >
                      +
                    </button>
                  </p>
                </div>
                <img src={chaat.link} alt='img' className='h-full  w-52 p-0 absolute right-0 top-0 rounded-r-lg ' />
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