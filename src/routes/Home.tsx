import React, { useEffect, useState } from 'react'
import { GetHouseData } from '../api'
import axios from 'axios'
import { TodayTradeCard } from '../components/TodayTradeCard'
import { ToTop } from '../components/ToTop'

export const Home = () => {
  const [data, setData] = useState("")
  return (
    <>
      <div className='flex w-[100vw] flex-col'>
        <div className='flex flex-row justify-around bg-[gray] rounded-[20px] p-2 mt-2 mb-2'>
          <button className='bg-[yellow] p-2 rounded-[20px] w-[150px]'>오늘의 실거래</button>
          <button className='bg-[yellow] p-2 rounded-[20px] w-[150px]'>매매</button>
          <button className='bg-[yellow] p-2 rounded-[20px] w-[150px]'>오늘의 실거래</button>
          <button className='bg-[yellow] p-2 rounded-[20px] w-[150px]'>오늘의 실거래</button>
          <button className='bg-[yellow] p-2 rounded-[20px] w-[150px]'>오늘의 실거래</button>
        </div>
        <TodayTradeCard />
      </div>
      <ToTop />
    </>
  )
}