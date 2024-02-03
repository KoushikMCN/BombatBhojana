"use client"
import React, { useState, useEffect } from 'react'
import { collection, doc, addDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedmc, setSelectedMC] = useState([])
  const [mainCourse, setMainCourse] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr);
      console.log(itemsArr)
      let result = itemsArr.filter(item => item.category === 'MainCourse')
      setMainCourse(result)
    })

  }, [])

  const selectItems = (item) => {
    setSelectedMC((prevItems) => [...prevItems, item])
    // console.log(selectedDesserts)
  }

  const placeOrder = async () => {
    // console.log(ins);
    const docRef = await addDoc(collection(db, "mc-orders"), {
      selectedmc
    })
    setSelectedMC([])
    alert("Go to orders page to place your order");
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <div>
      <h1 className="text-center text-3xl uppercase p-4 bg-amber-600 text-white">Main Course</h1>
      <div className='sticky top-0 '>
        <img src='\images\maincourse.jpg' className='-z-1 absolute top-0 opacity-40' />
      </div>
      <div className='flex w-full'>
      <ul className='w-4/5'>
        {
          mainCourse.map((mc, index) => (
            <li key={index}>
              <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-indigo-950 rounded-lg bg-yellow-700/30'>
                <div>
                  <p className='text-2xl uppercase bg-slate-100/50 rounded-lg p-1'>{mc.name}</p> <br />
                  <p className='text-blue-600'>Calories: {mc.calories}cal.</p>
                  <p className='text-rose-600'>Price: &#8377;{mc.price}</p>
                  <p className='text-xl'>
                    <button
                      className='text-4xl font-bold bg-amber-900/20 p-1 px-3 rounded-full transition duration-200 hover:scale-110'
                      onClick={() => selectItems(mc)}
                    >
                      +
                    </button>
                  </p>
                </div>
                <img src={mc.link} alt='img' className='h-full w-52 p-0 absolute right-0 top-0 rounded-r-lg ' />
              </div>
            </li>
          )
          )
        }
      </ul>
      <div className='border-l-2 border-orange-700 p-4 bg-orange-700/35 mr-0 w-1/5 h-lvh sticky top-0'>
        {
          (selectedmc.length) === 0 ? <div className='p-8'>Added items will appear here</div> : <><div className='text-3xl text-center'>ADDED ITEMS</div> <ul className='flex justify-center items-center flex-col'>
            {selectedmc.map((selected, index) => (
              <li className='block text-2xl'>{selected.name}<span className='text-lg'>(&#8377;{selected.price})</span></li>
            ))}
            <button onClick={placeOrder} className='p-2 m-4 border-2 border-slate-800 rounded-lg bg-orange-700/55 transition duration-200 hover:scale-110'>Push to Orders</button>
          </ul>
          </>
        }
      </div>
      </div> 
    </div>
  )
}

export default page