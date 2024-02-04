"use client"
import React, { useEffect, useState } from 'react'
import { collection, doc, deleteDoc, addDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"
import Header from '@/components/Header';

const page = () => {
  // const [selectedDesserts, setSelectedItems] = useState([])
  const [orders, setOrders] = useState([])
  const [desserts, setDesserts] = useState([])
  const [mainCourse, setMainCourse] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'selectedItems'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let ordersArr = []
        querySnapshot.forEach((doc) => {
          ordersArr.push({ ...doc.data(),  id: doc.id })
        })
        setOrders(ordersArr);
      })
    }
    fetch();
  }, [])

  const handleServed = async(id) => {
    await deleteDoc(doc(db, 'selectedItems', id))
    console.log("Order Served")
  }

  return (
    <div>
      <Header />
      {
        (orders.length)>0?
        <ul>
        {
          orders.map((order, index) => (
            <li key={index} className='relative flex m-4 p-10 border-b-2 border-r-2 border-orange-600 rounded-xl bg-amber-600/30'>
              <div className='flex flex-col'>
                <h2 className='text-lg font-bold'>TABLE NUMBER <span className='text-sm'>{order.tableno}</span></h2>
                {
                  orders[index].selectedItems.map((sel, i) => {
                    return (<p key={i}>{sel.newName}</p>)
                  })
                }
              </div>
              <button onClick={() => handleServed(order.id)} className='absolute right-10 bottom-10 p-2 border-2 border-slate-950 rounded-lg bg-slate-100/45'>SERVED</button>
            </li>
          ))
        }
      </ul>:
      <h1 className='text-2xl text-center font-extrabold text-sky-900'>No Orders to Display</h1>
      }
    </div>
  )
}

export default page