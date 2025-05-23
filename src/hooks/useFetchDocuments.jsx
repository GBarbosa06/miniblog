import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { 
    collection, 
    query,
    getDocs, 
    orderBy,
    onSnapshot,
    where,
    QuerySnapshot, 
 } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [cancelled, setCancelled] = useState(false);

    useEffect(() =>{
        const loadData = async () =>{
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let q;

                //search
                if(search){
                    q = await query(collectionRef, where("tags", "array-contains", search), orderBy("createdAt", "desc"));
                } else if(uid){
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
                } else{
                    q = await query(collectionRef, orderBy("createdAt", "desc"));
                }

                //dashboards


                await onSnapshot(q, (QuerySnapshot) => {
                    setDocuments(
                        QuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
            
        }
        loadData();
    }, [docCollection, documents, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);
    return { documents, loading, error };
};