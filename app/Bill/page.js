'use client';
import React, { useEffect, useState } from 'react'
import { Starters } from "../Menu/Starters/page";
import { MainCourse } from "../Menu/MainCourse/page";
import { Drinks } from "../Menu/Drinks/page";
import { Desserts } from "../Menu/Desserts/page";
import { Chaats } from "../Menu/Chaats/page";


const page = () => {
    const [totalBill, setTotalBill] = useState(0)

    // const calculate = () => {

    // }

    useEffect(() => {
        Starters.map((Starters) => {
            setTotalBill(totalBill + (Starters.price * Starters.quantity))
        }
        )
    }, [])



    return (
        <>
            <h1 className='text-3xl text-center p-4 bg-purple-800'>BILL</h1>
            <div className='flex flex-col justify-center'>
                <table>
                    <thead className='border-b border-slate-700'>
                        <tr>
                            <th className='p-4'>Item Name</th>
                            <th className='p-4'>Quantity</th>
                            <th className='p-4'>Unit Price</th>
                            <th className='p-4'>Price</th>
                        </tr>
                    </thead>
                    < tbody >
                        {
                            Starters.map((Starters) => (
                                (Starters.quantity) > 0 ? <tr> <th>{Starters.name}</th>  <th>{Starters.quantity}</th> <th>{Starters.price}</th> <th>{Starters.price * Starters.quantity}</th></tr> : <tr></tr>
                        ))}
                        {
                            MainCourse.map((MainCourse) => (
                                (MainCourse.quantity) > 0 ? <tr> <th>{MainCourse.name}</th>  <th>{MainCourse.quantity}</th> <th>{MainCourse.price}</th> <th>{MainCourse.price * MainCourse.quantity}</th></tr> : <tr></tr>
                        ))
                        }
                        {
                            Chaats.map((Chaats) => (
                                (Chaats.quantity) > 0 ? <tr> <th>{Chaats.name}</th>  <th>{Chaats.quantity}</th> <th>{Chaats.price}</th> <th>{Chaats.price * Chaats.quantity}</th></tr> : <tr></tr>
                        ))
                        }
                        {
                            Drinks.map((Drinks) => (
                                (Drinks.quantity) > 0 ? <tr> <th>{Drinks.name}</th>  <th>{Drinks.quantity}</th> <th>{Drinks.price}</th> <th>{Drinks.price * Drinks.quantity}</th></tr> : <tr></tr>
                        ))
                        }
                        {
                            Desserts.map((Desserts) => (
                                (Desserts.quantity) > 0 ? <tr> <th>{Desserts.name}</th>  <th>{Desserts.quantity}</th> <th>{Desserts.price}</th> <th>{Desserts.price * Desserts.quantity}</th></tr> : <tr></tr>
                        ))
                        }
                    </tbody>
                    <tfoot className='border-t border-cyan-700'>
                        <tr><th></th><th></th><th>Total:</th> <th>{totalBill}</th></tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default page