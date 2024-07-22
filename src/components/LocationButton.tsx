import React from 'react'

interface Props {
    title: string
    setCityNumber: (value: string) => void
    cityNumber: string
    currentNumber: string
}

export const LocationButton = ({ title, setCityNumber, cityNumber, currentNumber
}: Props) => {
    return (
        <button
            className={`bg-[red] p-2 rounded-[10px] m-[10px] hover:bg-[green] ${cityNumber == currentNumber && "bg-[blue]"}`}
            onClick={() => setCityNumber(cityNumber)}
        >
            {title}
        </button>
    )
}
