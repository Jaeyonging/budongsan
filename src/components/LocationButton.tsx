import React from 'react'

interface Props {
    title: string
    setCityNumber: (value: string) => void
    cityNumber: string
}

export const LocationButton = ({ title, setCityNumber, cityNumber }: Props) => {
    return (
        <button
            className='bg-[red] p-2 rounded-[10px] w-[80px] m-[10px] hover:bg-[green]'
            onClick={() => setCityNumber(cityNumber)}
        >
            {title}
        </button>
    )
}
