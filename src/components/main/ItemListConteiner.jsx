import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import { useParams } from 'react-router-dom';
import data from "../../data/productos.json";
import categories from "../../data/categorias.json"

export const ItemListConteiner = () => {

  let { categoryId } = useParams();
  let [productos, setProductos] = useState([]);

  let [titulo, setTitulo] = useState([]);

  useEffect(() => {

    const pedirProductos = () => {
      return new Promise((resolve, reject) => {
        resolve(data);
      })
    }

    pedirProductos()
      .then((res) => {
        if (!categoryId) {
          setTitulo("Productos");
          setProductos(res);
        } else {
          setTitulo(categories.find((cat) => cat.id === categoryId).nombre);
          setProductos(res.filter((prod) => prod.categoria.id === categoryId));
        }
      })

  }, [categoryId]);



  return (
    <ItemList productos={productos} />

  )
}
