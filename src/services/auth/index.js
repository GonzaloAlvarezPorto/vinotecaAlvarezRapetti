import { db } from "@/lib/firebase"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import bcrypt from 'bcryptjs'

export const registerUser = async ({ username, password, email }) => {
    const q = query(collection(db, "usuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) throw new Error("El usuario ya existe");

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUserRef = doc(collection(db, "usuarios"));
    await setDoc(newUserRef, {
        username,
        password: hashedPassword,
        role: "user",
        email
    })

    return { id: newUserRef.id, username, role: "user", email };
}

export const loginUser = async ({ email, password }) => {
    const q = query(collection(db, "usuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) throw new Error("Usuario no encontrado");

    const userDoc = querySnapshot.docs[0].data();

    const isValid = bcrypt.compareSync(password, userDoc.password);
    if (!isValid) throw new Error("Contraseña incorrecta");


    return userDoc;
}