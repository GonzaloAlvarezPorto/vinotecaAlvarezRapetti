import React, { useState } from 'react'

export const Counter = () => {

    let min = 0;

    let max = 10;

    let [count, setCount] = useState(1);

    const handleRestar = () => {
        count > min && setCount((prev) => prev - 1);
    }

    const handleSumar = () => {
        count < max && setCount((prev) => prev + 1);
    }

    return (
        <div className='fichaProducto__contador'>
            <button className='contador__botones' onClick={handleRestar}>Restar</button>
            <p className='contador__numero'>{count}</p>
            <button className='contador__botones' onClick={handleSumar}>Sumar</button>
        </div>
    )
}
