import React from 'react'

interface Props {
    title: string
    setCurrCityNumber: (value: string) => void
    cityNumber: string
    currentNumber: string
}

export const LocationButton = ({ title, setCurrCityNumber, cityNumber, currentNumber }: Props) => {
    console.log(cityNumber, " dfasdfsadfsad", currentNumber)
    return (
        <button
            className={`bg-[red] p-2 rounded-[10px] m-[10px] hover:bg-[green] ${cityNumber == currentNumber && "bg-[#18fa8d]"}`}
            onClick={() => setCurrCityNumber(cityNumber)}
        >
            {title}
        </button>
    )
}
