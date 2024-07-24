import React, { useEffect, useState } from 'react'
import { LocationButton } from './LocationButton'
import { GetHouseData, GetHouseMonthData } from '../api'
import { calculatePrice, calculateSize, SeoulLocationToNumber } from '../types/types';

interface HouseData {
    dealAmount: string;
    dealingGbn: string;
    buildYear: number;
    dealYear: number;
    jibun: string,
    dealMonth: string,
    dealDay: string,
    aptNm: string,
    excluUseAr: number,
    floor: string,
    umdNm: string,
}

interface HouseMonthData {
    지번: string,
    계약기간: string,
    보증금액: string,
    월세금액: number,
    아파트: string,
}

export const TodayTradeCard = () => {
    const [houseData, setHouseData] = useState<HouseData[]>([])
    const [houseMonthData, setHouseMonthData] = useState<HouseMonthData[]>([])
    const [currCityNumber, setCurrCityNumber] = useState("11680")
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        GetHouseData(currCityNumber, "202407").then((response) => {
            setHouseData(response)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        GetHouseMonthData(currCityNumber, "202407").then((res) => {
            console.log(res)
            if (res == null) {
                return
            }
            setHouseMonthData(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [currCityNumber])

    const today = new Date()

    const renderMonthPrice = (name: string) => {
        return houseMonthData
            .filter((item) => item.지번 === name)
            .map((filteredItem, index) => (
                <div key={index} className='text-[black] bg-[yellow] p-2 m-2'>
                    <p>지번: {filteredItem.지번}</p>
                    <p>계약기간: {filteredItem.계약기간}</p>
                    <p>보증금액: {calculatePrice(filteredItem.보증금액)}</p>
                    <p>월세금액: {filteredItem.월세금액 ? <>{filteredItem.월세금액}만원</> : <>전세</>}</p>
                    <p>아파트: {filteredItem.아파트}아파트</p>
                </div>
            ));
    };

    return (
        <div className='flex flex-col bg-[gray] text-[20px] text-center'>
            이번 {today.getMonth() + 1}월 달의 실거래
            <div className='flex flex-row flex-wrap'>
                {SeoulLocationToNumber.map(([title, cityNumber], index) => (
                    <LocationButton
                        key={`${cityNumber}-${index}`}
                        title={title}
                        setCurrCityNumber={setCurrCityNumber}
                        cityNumber={cityNumber}
                        currentNumber={currCityNumber}
                    />
                ))}
            </div>
            {isLoading ? <div>Loading...</div> :
                houseData.length > 0 ? (
                    <div className='flex flex-col text-start'>
                        {houseData.map((item, index) => (
                            <div key={index} className=' flex flex-col text-[black]  bg-[green] p-2 m-2'>
                                <p>주소: {item.umdNm} {item.jibun} {item.aptNm}아파트 {item.floor}층</p>
                                <p>평수: {calculateSize(item.excluUseAr)}평</p>
                                <p>거래금액: {calculatePrice(item.dealAmount)}</p>
                                <p>거래일: {item.dealYear}년 {item.dealMonth}월 {item.dealDay}일</p>
                                <p>거래유형: {item.dealingGbn}</p>
                                <p>건축년도: {item.buildYear}</p>
                                <div>{renderMonthPrice(item.jibun)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Data</div>
                )
            }
        </div>
    )
}
