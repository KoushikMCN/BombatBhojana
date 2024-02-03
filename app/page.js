'use-client'
import Image from 'next/image'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className='font-mono'>
      <Header />
      <div className='flex flex-col p-4'>
      <a href='./Menu' className='p-4 m-4'>Menu</a>
      <a href='./Bill' className='p-4 m-4'>Bill</a>
      </div>
    </div>
  )
}
