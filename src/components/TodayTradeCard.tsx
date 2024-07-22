import React, { useEffect, useState } from 'react'
import { LocationButton } from './LocationButton'
import { GetHouseData, GetHouseMonthData } from '../api'
import { calculatePrice, calculateSize, getAddress, SeoulLocationToNumber } from '../types/types';

interface HouseData {
    거래금액: string;
    거래유형: string;
    건축년도: number;
    년: number;
    도로명: string;
    도로명건물본번호코드: string,
    도로명건물부번호코드: string,
    지번: string,
    월: string,
    일: string,
    아파트: string,
    전용면적: number,
    층: string
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
    const [cityNumber, setCityNumber] = useState("11680")
    const [isLoading, setLoading] = useState(false)
    const [currentNumber, setCurrentNumber] = useState("")

    useEffect(() => {
        setLoading(true)
        GetHouseData(cityNumber, "202407").then((response) => {
            setHouseData(response)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        GetHouseMonthData(parseInt(cityNumber), 202407).then((res) => {
            if (res == null) {
                return
            }
            setHouseMonthData(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [cityNumber])

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
                        setCityNumber={setCityNumber}
                        cityNumber={cityNumber}
                        currentNumber={currentNumber}
                    />
                ))}
            </div>
            {isLoading ? <div>Loading...</div> :
                houseData.length > 0 ? (
                    <div className='flex flex-col text-start'>
                        {houseData.map((item, index) => (
                            <div key={index} className='text-[black] bg-[green] p-2 m-2'>
                                <p>주소: {getAddress(item.도로명, item.도로명건물본번호코드, item.도로명건물부번호코드)}</p>
                                <p>지번: {item.지번}</p>
                                <p>아파트: {item.아파트}아파트 {item.층}층</p>
                                <p>평수: {calculateSize(item.전용면적)}평</p>
                                <p>거래금액: {calculatePrice(item.거래금액)}</p>
                                <p>거래일: {item.년}년 {item.월}월 {item.일}일</p>
                                <p>거래유형: {item.거래유형}</p>
                                <p>건축년도: {item.건축년도}</p>
                                <div>{renderMonthPrice(item.지번)}</div>
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
