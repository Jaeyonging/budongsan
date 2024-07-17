import React, { useEffect, useState } from 'react'
import { GetHouseData } from '../api'
import axios from 'axios'
import { TodayTradeCard } from '../components/TodayTradeCard'

export const Home = () => {
  const [data, setData] = useState("")
  const [cityNumber, setCityNumber] = useState("11680")
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    GetHouseData(cityNumber, "202407").then((response => {
      setData(response)
      setLoading(false)
    })
    ).catch(error => {
      console.log(error)
    })

  }, [cityNumber])
  return (
    <div className='flex w-[100vw]'>
      {
        !isLoading ? <TodayTradeCard data={data} setCityNumber={setCityNumber}></TodayTradeCard>
          : <div>Loading</div>
      }
    </div>
  )
}