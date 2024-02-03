"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
  const [items, setItems] = useState([])
  const [drinks, setDrinks] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr);
      let result = itemsArr.filter(item => item.category === 'Drinks')
      setDrinks(result)
    })

  }, [])
    const handleChange = (a, index) => {
        Drinks[{ index }].quantity = Drinks[{ index }].quantity + a
    }

    return (
        <div>
            <h1 className="text-center text-3xl uppercase p-4 bg-cyan-700 text-white">Drinks</h1>
            <div className='sticky top-0 '>
                <img src='\images\drinks.jpg' className='-z-1 absolute top-0 opacity-40' />
            </div>
            {/* <div className='absolute top-0'> */}
            <ul>
                <li>
                    {
                        drinks.map((drink, index) => (
                            <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-indigo-800 rounded-xl bg-sky-300/50'>
                                <div>
                                    <p className='text-2xl uppercase'>{drink.name}</p> <br />
                                    <p className='text-blue-600'>Calories: {drink.calories}cal.</p>
                                    <p className='text-rose-600'>Price: &#8377;{drink.price}</p>
                                    <p className='text-xl'>Quantity:
                                        <span>{drink.quantity}</span>
                                        <button onClick={() => handleChange(+1, index)}>+</button>
                                    </p>
                                </div>
                                <img src={drink.link} alt='img' className='h-full  w-52 p-0 absolute right-0 top-0 rounded-r-xl ' />
                            </div>
                        )
                        )
                    }
                </li>
            </ul>
            {/* </div> */}
        </div>
    )
}

export default page