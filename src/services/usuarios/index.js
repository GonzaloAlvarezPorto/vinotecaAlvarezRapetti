// getClientes
// updateCliente
// deleteCliente
// getClienteById

import { db } from "@/lib/firebase"
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"

const usuariosRef = collection(db, "usuarios")

export const getUsuarios = async () => {
    const snapshot = await getDocs(usuariosRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const getUsuarioById = async (id) => {
    const docRef = doc(db, "usuarios", id);
    const snapshot = await getDoc(docRef);

    if(!snapshot.exists()) return null;
    return {id: snapshot.id, ...snapshot.data()}
}

export const updateUsuario = async (id, data) => {
  const usuarioRef = doc(db, "usuarios", id)
  await updateDoc(usuarioRef, data)
  return { id, ...data }
}

export const deleteUsuario = async (id) => {
    const docRef = doc(db, "usuarios",id);
    await deleteDoc(docRef);
    return id;
}