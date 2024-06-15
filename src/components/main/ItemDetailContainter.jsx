import React, { useContext, useEffect, useState } from 'react'
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const ItemDetailContainter = () => {

    let { itemId } = useParams();
    let [producto, setProducto] = useState(undefined);

    let [cargando, setCargando] = useState(true);

    useEffect(() => {

        const docRef = doc(db, "productos", itemId);
        getDoc(docRef)
            .then(res => {
                if (res.data()) {
                    setProducto({ ...res.data(), id: res.id });
                }
                setCargando(false);
            })

    }, [itemId]);

    if (cargando) {
        return <div>"Cargando..."</div>
    }
    else if (producto){
        return <ItemDetail producto={producto} /> 
    }
    else {
        return <div>Producto no encontrado</div>
    }
}
