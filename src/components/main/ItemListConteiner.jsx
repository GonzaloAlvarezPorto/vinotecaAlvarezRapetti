import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../..//firebase/config";

export const ItemListConteiner = () => {

  let { categoryId } = useParams();
  let [productos, setProductos] = useState([]);

  useEffect(() => {

    const productosRef = collection(db, "productos");
    const q = categoryId ? query(productosRef, where("categoria.id", "==", categoryId)) : productosRef;

    const categoriasRef = collection(db, "categorias");
    
    getDocs(q)
      .then((res) => {
        setProductos(
          res.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
          })
        )
      })
  }, [categoryId]);

  return (
    <ItemList productos={productos} />

  )
}
