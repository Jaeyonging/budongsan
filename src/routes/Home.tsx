import React, { useEffect, useState } from 'react'
import { GetHouseData } from '../api'
import axios from 'axios'
import { TodayTradeCard } from '../components/TodayTradeCard'
import { ToTop } from '../components/ToTop'

export const Home = () => {
  const [data, setData] = useState("")
  return (
    <>
      <div className='flex w-[100vw]'>
        <TodayTradeCard />
      </div>
      <ToTop />
    </>
  )
}