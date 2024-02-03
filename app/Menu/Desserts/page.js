"use client"
import React, { useState, useEffect } from 'react'
import { collection, addDoc, setDoc, query, querySnapshot, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
  const [selectedItems, setSelectedDesserts] = useState([])
  const [items, setItems] = useState([])
  const [desserts, setDesserts] = useState([])
  const [tableno, setTableNo] = useState('')
  useEffect(() => {
    const q = query(collection(db, 'items'))
    onSnapshot(q, (querySnapshot) => {
      let itemsArr = []
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr);
      let result = itemsArr.filter(item => item.category === 'Desserts')
      setDesserts(result)
    })
  }, [])

  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems])


  const selectItems = (item) => {
    let newName=item.name;
    let newPrice=item.price;
    // let newItem={item.name, item.price}
    setSelectedDesserts((prevItems) => [...prevItems, {newName, newPrice}])
    console.log(selectedItems)
  }

  const placeOrder = async () => {
    let ins = []
    // console.log(ins);
    if (tableno !== '') {
      const docRef = await addDoc(collection(db, "selectedItems"), {
        selectedItems,
        tableno: tableno
      })
      // alert("Go to orders page to place your order");
      console.log("Document written with ID: ", docRef.id);
    } else {
      alert("Please enter table number")
    }
    // setSelectedDesserts([])
  }

  return (
    <div>
      <h1 className="text-center text-3xl uppercase p-4 bg-orange-950 text-white">Desserts</h1>
      <div className='absolute top-5 right-5 text-white pl-4 border-l-2 border-slate-50'><a href='/Orders'>Go to orders</a></div>
      <div className='sticky top-0 '>
        <img src='\images\desserts.jpg' className='-z-1 absolute top-0 opacity-40 w-full' />
      </div>
      <div className='flex'>
        <ul className='w-4/5'>
          {
            desserts.map((dessert, index) => (
              <li key={index}>
                <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-orange-950 rounded-lg bg-amber-950/30'>
                  <div>
                    <p className='text-2xl uppercase bg-slate-100/30 rounded-lg p-1'>{dessert.name}</p> <br />
                    <p className='text-blue-600'>Calories: {dessert.calories}cal.</p>
                    <p className='text-rose-600'>Price: <span className='text-lg'>&#8377;{dessert.price}</span></p>
                    <p className='text-xl'>
                      <button
                        className='text-4xl font-bold bg-amber-900/20 p-1 px-3 rounded-full transition duration-200 hover:scale-110'
                        onClick={() => selectItems(dessert)}
                      >
                        +
                      </button>
                    </p>
                  </div>
                  <img src={dessert.link} alt='img' className='h-full  w-60 p-0 absolute right-0 top-0 rounded-r-lg ' />
                </div>
              </li>
            )
            )
          }
        </ul>
        <div className='border-l-2 border-amber-950 p-4 bg-amber-900/35 mr-0 w-1/5 h-lvh sticky top-0'>
          {
            (selectedItems.length) === 0 ? <div className='p-8'>Added items will appear here</div> : <><div className='text-3xl text-center'>ADDED ITEMS</div> <ul className='flex justify-center items-center flex-col'>
              {selectedItems.map((selectedItems, index) => (
                <li className='block text-2xl' key={index}>{selectedItems.newName}<span>(&#8377;{selectedItems.newPrice})</span></li>
              ))}
            </ul>
              <div className='flex flex-col justify-center items-center'>
                <input type='number' value={tableno} onChange={(e) => setTableNo(e.target.value)} placeholder='PLEASE ENTER TABLE NUMBER' className='p-2 w-max m-4 border-2 rounded-lg bg-slate-950 text-white' />
                <button onClick={placeOrder} className='p-2 m-4 border-2 border-slate-950 rounded-lg bg-amber-950/55 transition duration-200 hover:scale-110'>Place Order</button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default page