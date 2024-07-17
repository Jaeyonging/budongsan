import React, { useEffect } from 'react'
import { GetHouseData } from '../api'
import axios from 'axios'

export const Home = () => {
  useEffect(() => {
    GetHouseData("11500", "202407").then((response => {
      console.log(response.data)
    })
    ).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className='bg-[gray] w-[100vw] h-[100vh]'>

    </div>
  )
}