import React, { useEffect, useState } from 'react'
import { LocationButton } from './LocationButton'



interface Props {
    data: any
    setCityNumber: (value: string) => void
}

export const TodayTradeCard = ({ data, setCityNumber }: Props) => {
    const [houseData, sethouseData] = useState<any>()
    const today = new Date()

    useEffect(() => {
        sethouseData(data)
    }, [data])


    const calculatePrice = (price: string) => {
        if (price) {
            let cleanedPrice = price.replace(/,/g, "");
            let num = parseInt(cleanedPrice, 10) / 10000
            let num2 = parseInt(cleanedPrice, 10) % 10000
            return Math.floor(num) + "억" + num2 + "만원"
        }
        return 0
    }

    return (
        <div className='flex flex-col w-[520px] bg-[gray] text-[20px] text-center'>
            오늘의 실거래 {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDay()}일
            <div className='flex flex-row flex-wrap'>
                <LocationButton title='강남구' setCityNumber={setCityNumber}></LocationButton>
                <LocationButton title='강동구' setCityNumber={setCityNumber}></LocationButton>
                {/* <LocationButton title='강북구'></LocationButton>
                <LocationButton title='강서구'></LocationButton>
                <LocationButton title='관악구'></LocationButton>
                <LocationButton title='광진구'></LocationButton>
                <LocationButton title='구로구'></LocationButton>
                <LocationButton title='금천구'></LocationButton>
                <LocationButton title='노원구'></LocationButton> */}
            </div>
            {houseData ? (
                <div className='flex flex-col text-start'>
                    {houseData.map((item: any, index: number) => (
                        <div key={index} className='text-[black] bg-[green] p-2 m-2'>
                            <p>거래금액: {calculatePrice(item.거래금액)}</p>
                            <p>거래유형: {item.거래유형}</p>
                            <p>건축년도: {item.건축년도}</p>
                            <p>년: {item.년}</p>
                            <p>도로명: {item.도로명}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No Data</div>
            )}
        </div>

    )
}
