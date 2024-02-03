"use client"
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, addDoc, query, querySnapshot, onSnapshot, where, sum } from "firebase/firestore";
import { db } from "../../firebase"
import Header from '@/components/Header';

const page = () => {
  // const [selectedDesserts, setSelectedItems] = useState([])
  const [items, setItems] = useState([])
  const [tableno, setTableNo] = useState('')
  const [total, setTotal] = useState(0)
  // const [res, setRes] = useState([])
  useEffect(() => {
  }, [])

  // useEffect(() => {
  //   console.log(items)
  //   items.selectedItems.map((item)=>calculateTotal(item.newPrice))
  // }, [items])

  // useEffect(() => {
  //   console.log(total)
  // }, [total])



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tableno)
    const q = query(collection(db, 'selectedItems'), where("tableno", "==", tableno));
    const result = await getDocs(q)
    const res = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(res)
    setItems(res)
    const calculateTotal = () => {
      const tp = res.reduce((sum, item) => sum + parseFloat(item.semiTotal), 0)
      setTotal(tp)
    }
    calculateTotal();

  }


  return (
    <div>
      <Header />
      {(items.length) === 0 ?
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
          <div>
            <label htmlFor='table' className='text-lg uppercase'>Enter your Table number:</label>
            <input type='number' id='table' name='tno' value={tableno} onChange={(e) => setTableNo(e.target.value)} className='p-2 m-4 border-b-2 border-cyan-950 w-16' />
          </div>
          <input type='submit' value="SEE YOUR ORDERS" className='border-2 border-red-950 rounded-lg p-2 px-3 bg-red-300/40' />
        </form> :
        <div className='m-10'>
          <div className='text-2xl text-center'>YOUR ORDERS</div>
          {/* {console.log(items)} */}
          <div className='text-center'> Table No :{tableno}</div>
          <div className='flex flex-col justify-center items-center'>
            <div className='w-2/3 border-b-2 border-black'>
              {
                items.map((order, index) => (
                  <div key={index} className='text-black'>
                    {/* {calculateTotal(order)} */}
                    {
                      order.selectedItems.map((item, i) => {
                        return (
                          <div key={i} className='relative p-0'>
                            <span className='p-4 m-4 text-red-700 text-lg'>{item.newName}</span>
                            <span className='p-4 m-4 text-red-700 text-lg absolute -bottom-8 right-20 '>{item.newPrice}</span>
                          </div>
                        )
                      })}
                  </div>
                )
                )
              }
            </div>
            <div className='text-center text-2xl uppercase relative'><span className='p-4 m-4'>Total:</span><span className='p-4 m-4'>{total}</span></div>
          </div>
        </div>
      }
    </div>
  )
}

export default page