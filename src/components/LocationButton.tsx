import React from 'react'
import { SeoulLocationToNumber } from '../types/example';

interface Props {
    title: string
    setCityNumber: (value: string) => void
}

export const LocationButton = ({ title, setCityNumber }: Props) => {
    const handleClick = () => {
        const cityNumber = SeoulLocationToNumber.find(([name]) => name === title)?.[1];
        if (cityNumber) {
            setCityNumber(cityNumber);
        }
    };

    return (
        <button className='bg-[red] p-2 rounded-[10px] w-[80px] m-[10px] hover:bg-[green]' onClick={handleClick}>{title}</button>
    )
}
