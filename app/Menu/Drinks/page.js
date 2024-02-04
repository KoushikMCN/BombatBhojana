"use client"
import React, { useState, useEffect } from 'react'
import { collection, addDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
    const [selectedItems, setSelectedItems] = useState([])
    const [items, setItems] = useState([])
    const [drinks, setDrinks] = useState([])
    const [tableno, setTableNo] = useState('')
    const [semiTotal, setSemiTotal] = useState(0)
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
    

    const selectItems = (item) => {
        let newName = item.name;
        let newPrice = item.price;
        setSemiTotal((prevSemiTotal) => prevSemiTotal + parseFloat(newPrice))
        // let newItem={item.name, item.price}
        setSelectedItems((prevItems) => [...prevItems, { newName, newPrice }])
        console.log(selectedItems)
    }

    const placeOrder = async () => {
        let ins = []
        // console.log(ins);
        if (tableno !== '') {
            const docRef = await addDoc(collection(db, "selectedItems"), {
                selectedItems,
                tableno: tableno,
                semiTotal: semiTotal
            })
            await addDoc(collection(db, `${tableno}`), {
                selectedItems,
                tableno: tableno,
                semiTotal: semiTotal
              })
              setSelectedItems([])
            alert("Order has been placed");
            console.log("Document written with ID: ", docRef.id);
        } else {
            alert("Please enter table number")
        }

    }

    return (
        <div>
            <h1 className="text-center text-3xl uppercase p-4 bg-cyan-700 text-white">Drinks</h1>
            <div className='absolute top-5 right-5 text-white pl-4 border-l-2 border-slate-50'><a href='/Orders'>Go to orders</a></div>
            <div className='sticky top-0 '>
                <img src='\images\drinks.jpg' className='-z-1 absolute top-0 opacity-40' />
            </div>
            <div className='flex'>
                <ul className='w-4/5'>
                    {
                        drinks.map((drink, index) => (
                            <li key={index}>
                                <div className='flex relative top-0 m-16 mx-32 h-52 p-5 border-2 border-indigo-800 rounded-xl bg-sky-300/50'>
                                    <div>
                                        <p className='text-2xl uppercase'>{drink.name}</p> <br />
                                        <p className='text-blue-600'>Calories: {drink.calories}cal.</p>
                                        <p className='text-rose-600'>Price: &#8377;{drink.price}</p>
                                        <p className='text-xl'>
                                            <button
                                                className='text-4xl font-bold bg-sky-900/20 p-1 px-3 rounded-full transition duration-200 hover:scale-110'
                                                onClick={() => selectItems(drink)}>
                                                +
                                            </button>
                                        </p>
                                    </div>
                                    <img src={drink.link} alt='img' className='h-full  w-52 p-0 absolute right-0 top-0 rounded-r-xl ' />
                                </div>
                            </li>
                        )
                        )
                    }
                </ul>
                <div className='border-l-2 border-blue-950 p-4 bg-cyan-900/35 mr-0 w-1/5 h-lvh sticky top-0'>
                    {
                        (selectedItems.length) === 0 ? <div className='p-8'>Added items will appear here</div> :
                            <>
                                <div className='text-3xl text-center'>ADDED ITEMS</div>
                                <ul className='flex justify-center items-center flex-col'>
                                    {selectedItems.map((selectedItems, index) => (
                                        <li className='block text-2xl' key={index}>{selectedItems.newName}<span>(&#8377;{selectedItems.newPrice})</span></li>
                                    ))}
                                </ul>
                                <div className='flex flex-col justify-center items-center'>
                                    <input type='number' value={tableno} onChange={(e) => setTableNo(e.target.value)} placeholder='PLEASE ENTER TABLE NUMBER' className='p-2 w-max m-4 border-2 rounded-lg bg-slate-950 text-white' />
                                    <button onClick={placeOrder} className='p-2 m-4 border-2 border-sky-950 rounded-lg bg-sky-950/55 transition duration-200 hover:scale-110'>Place Order</button>
                                </div>
                            </>
                    }
                </div>
            </div>
            <a href='/Menu/Desserts' className='absolute top-1/2 left-2 bg-slate-300/30 text-5xl rounded-full px-2 z-999999'>&lt;</a>
        </div>
    )
}

export default page