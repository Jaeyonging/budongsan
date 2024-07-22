import React, { useEffect, useState } from 'react'
import { LocationButton } from './LocationButton'
import { GetHouseData, GetHouseMonthData } from '../api'
import { BusanLocationToNumber, SeoulLocationToNumber } from '../types/types';

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await GetHouseData(cityNumber, "202407")
                console.log(response)
                setHouseData(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        const fetchData2 = async () => {
            setLoading(true)
            try {
                const response = await GetHouseMonthData(cityNumber, "202407")
                console.log(response)
                setHouseMonthData(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        fetchData2()
    }, [cityNumber])

    const today = new Date()

    const renderMonthPrice = (name: string) => {
        return houseMonthData
            .filter((item) => item.지번 === name)
            .map((filteredItem, index) => (
                <div key={index} className='text-[black] bg-[yellow] p-2 m-2'>
                    <p>지번: {filteredItem.지번}</p>
                    <p>계약기간: {filteredItem.계약기간}</p>
                    <p>보증금액: {filteredItem.보증금액}</p>
                    <p>월세금액: {filteredItem.월세금액}원</p>
                    <p>아파트: {filteredItem.아파트}아파트</p>
                </div>
            ));
    };

    const calculatePrice = (price: string) => {
        if (price) {
            let cleanedPrice = price.replace(/,/g, "")
            let num = parseInt(cleanedPrice, 10) / 10000
            let num2 = parseInt(cleanedPrice, 10) % 10000
            return Math.floor(num) + "억" + num2 + "만원"
        }
        return "0원"
    }

    const calculateSize = (size: number) => {
        return (size * 0.3025).toFixed(2)
    }

    const getAddress = (roadname: string, roadbuilding: string, roadbuilding2: string) => {
        const mainNumber = parseInt(roadbuilding, 10);
        const subNumber = parseInt(roadbuilding2, 10);
        if (subNumber == 0) {
            return `${roadname} ${mainNumber}`;
        }
        return `${roadname} ${mainNumber}-${subNumber}`;
    };




    return (
        <div className='flex flex-col w-[520px] bg-[gray] text-[20px] text-center'>
            이번 {today.getMonth() + 1}월 달의 실거래
            <div className='flex flex-row flex-wrap'>
                {SeoulLocationToNumber.map(([title, cityNumber], index) => (
                    <LocationButton
                        key={`${cityNumber}-${index}`}
                        title={title}
                        setCityNumber={setCityNumber}
                        cityNumber={cityNumber}
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
                                <p>{renderMonthPrice(item.지번)}</p>
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
