import { db } from "@/lib/firebase";
import { 
    addDoc, 
    collection, 
    getDocs, 
    getDoc, 
    doc, 
    updateDoc, 
    deleteDoc 
} from "firebase/firestore";

const productosRef = collection(db, "productos");

// CREATE
export const createProducto = async (producto) => {
    const docRef = await addDoc(productosRef, producto);
    return { id: docRef.id, ...producto };
};

// READ ALL
export const getProductos = async () => {
    const snapshot = await getDocs(productosRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// READ ONE
export const getProductoById = async (id) => {
    const docRef = doc(db, "productos", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
};

// UPDATE
export const updateProducto = async (id, data) => {
    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, data);
    return { id, ...data };
};

// DELETE
export const deleteProducto = async (id) => {
    const docRef = doc(db, "productos", id);
    await deleteDoc(docRef);
    return id;
};
