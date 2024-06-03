import React, { useEffect, useState } from 'react'
import data from "../../data/productos.json"
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';

export const ItemDetailContainter = () => {

    let { itemId } = useParams();
    let [producto, setProducto] = useState(undefined);

    useEffect(() => {
        setProducto(data.find((prod) => prod.id === parseInt(itemId)));
    }, [itemId])

    return (
        <ItemDetail producto={producto} />
    )
}
