import React from 'react'
import { Item } from './Item'
import { Link } from 'react-router-dom'

export const ItemList = ({ productos }) => {
    return (
        <div className='cuerpoPrincipal'>
            <div className='cuerpoPrincipal__contenedorProductos'>
                {
                    productos.length > 0 ?
                        productos.map((producto) => {
                            return <Item key={producto.id} producto={producto} />
                        })
                        : <p>"No hay productos"</p>
                }
            </div>
        </div>
    )
}
