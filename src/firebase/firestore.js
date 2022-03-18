import { getFirestore, onSnapshot, query, collection, where, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore";

const db = getFirestore();

export const getImages = (userId, setFiles) => {
    const q = query(collection(db, "Files"), where("userId", "==", userId))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const files = [];

        querySnapshot.forEach((doc) => {
            files.push({...doc.data(), id: doc.id});
        });
        setFiles([...files]);
    });
    return unsubscribe;
}

export const sendFile = async (userId, imgURL, imageName) => {
    try {
        const docRef = await addDoc(collection(db, "Files"), {
            userId,
            imageName,
            imgURL,
            uploadedAt: serverTimestamp()
        });

        return docRef.id;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteFile = async (docId) => {
    try {
        const res = await deleteDoc(doc(db, "Files", docId));
        return res;
    } catch (error) {
        return error;
    }
}