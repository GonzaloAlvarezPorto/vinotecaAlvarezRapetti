import React, { useContext, useEffect, useState } from 'react'
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const ItemDetailContainter = () => {

    let { itemId } = useParams();
    let [producto, setProducto] = useState(undefined);

    useEffect(() => {

        const docRef = doc(db, "productos", itemId);
        getDoc(docRef)
            .then(res => {
                setProducto({ ...res.data(), id: res.id });
            })

    }, [itemId]);

    return (
        <div>{producto ? <ItemDetail producto={producto} /> : "Cargando..."}</div>
    )
}
