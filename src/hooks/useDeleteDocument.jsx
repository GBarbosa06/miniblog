import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
}

const deleteReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOCUMENT":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkIfIsCancelled = (action) => {
        if(!cancelled) {
            dispatch(action);
        }
    }

    const deleteDocument = async (id) => {
        checkIfIsCancelled({ type: "LOADING" });
        
        try{
            const deletedDocument = await deleteDoc(doc(db, docCollection, id));

            checkIfIsCancelled({
                type: "DELETED_DOCUMENT",
                payload: deletedDocument,
            });
        } catch (error) {
            checkIfIsCancelled({
                type: "ERROR",
                payload: error.message,
            });
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { deleteDocument, response };
};