"use client"
import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"

const page = () => {
    const [newItem, setnewItem] = useState({ category: "", name: "", price: '', calories: '', link: '' })

    // Add items to database(restaurant side)
    const addItem = async (e) => {
        e.preventDefault();
        try {
            if (newItem.name !== "" && newItem.category !== "" && parseInt(newItem.price) > 0 && parseInt(newItem.calories) > 0 &&newItem.link!=='') {
                // setItems({...items, newItem})
                const docRef = await addDoc(collection(db, "items"), {
                    category: newItem.category,
                    name: newItem.name,
                    link: newItem.link,
                    price: newItem.price,
                    calories: newItem.calories,
                })
                setnewItem({ category: "", name: "", price: '', calories: '' })
                alert("Added Items");
                console.log("Document written with ID: ", docRef.id);
                // window.location.href = '/Restaurant/Items'
            }
            else {
                alert('Please fill all fields');
            }
        } catch (e) {
            console.error("Adding document failed:" + e)
        }
    }

    return (
        <main>
            <Header />
            <div className='grid place-items-center'>
                <div className='grid place-items-center p-4 m-3 rounded-lg bg-cyan-900'>
                    <form
                        className="w-[700px] flex flex-row"
                        onSubmit={addItem}
                    >
                        <div className='w-[90%]'>
                            <select required value={newItem.category} onChange={(e) => setnewItem({ ...newItem, category: e.target.value })} className='p-4 m-3 block border-2 border-violet-950 rounded-lg w-full'>
                                <option>--SELECT CATEGORY--</option>
                                <option value="Starters">Starters</option>
                                <option value="MainCourse">MainCourse</option>
                                <option value="Chaats">Chaats</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                            <input type='text' value={newItem.name} onChange={(e) => setnewItem({ ...newItem, name: e.target.value })} placeholder='Dish Name' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                            <input type='number' value={newItem.price} onChange={(e) => setnewItem({ ...newItem, price: e.target.value })} placeholder='Price' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                            <input type='number' value={newItem.calories} onChange={(e) => setnewItem({ ...newItem, calories: e.target.value })} placeholder='Calories' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                            <input type='text' value={newItem.link} onChange={(e) => setnewItem({ ...newItem, link: e.target.value })} placeholder='Link for Image' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                        </div>
                        <button type='submit' className='bg-slate-500 w-max p-4 m-4 mx-6 rounded-lg transform transition duration-900 hover:scale-110 text-2xl'>+</button>
                    </form>
                </div>
                <a href='/Restaurant/Items' className='p-4 m-3 rounded-lg bg-cyan-900 text-white font-bold transform transition duration-300 hover:scale-110'>Go to Added Items</a>
            </div>
        </main>
    )
}

export default page