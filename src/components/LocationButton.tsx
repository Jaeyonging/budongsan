import React from 'react'

interface Props {
    title: string
    setCurrCityNumber: (value: string) => void
    cityNumber: string
    currentNumber: string
}

export const LocationButton = ({ title, setCurrCityNumber, cityNumber, currentNumber }: Props) => {
    return (
        <button
            className={`bg-[red] p-2 rounded-[10px] m-[10px] hover:bg-[green] ${cityNumber == currentNumber && "bg-[yellow]"}`}
            onClick={() => setCurrCityNumber(cityNumber)}
        >
            {title}
        </button>
    )
}
