import { db, app } from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { useState, useEffect } from "react";


export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    //clean up function
        //dealing with memory leaks
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(app);
    const checkIfIsCancelled = () => {
        if(cancelled) {
            return;
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled();
        setError(null);
        setLoading(true);

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false); 
            return user;
        } catch (error) {
            console.log(error.message);
            let systemErrorMEssage;
            if(error.message.includes("Password")){
                systemErrorMEssage = "A senha precisa conter pelo menos 6 caracteres.";
            }
            else if(error.message.includes("email-already")){
                systemErrorMEssage = "E-mail já cadastrado";
            }
            else{
                systemErrorMEssage = "Ocorreu um erro, por favor tente mais tarde."
            }
            setError(systemErrorMEssage);
            setLoading(false);
        }
               
    };
    //login
    const login = async (data) => {
        checkIfIsCancelled();
        setError(false);
        setLoading(true);

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        }
        catch(error) {
            console.log(error.message);
            let systemErrorMessage;
            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado.";
            }
            else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta.";
            }
            else if(error.message.includes("credential")){
                systemErrorMessage = "E-mail ou senha inválidos.";
            }
            else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
        
    }

    //logout
    const logout = () => {
        checkIfIsCancelled();
        setError(null);
        setLoading(true);
        try {
            signOut(auth); //esse é o método de logout do firebase, não precisaria do try catch, mas é bom para evitar erros
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setError("Ocorreu um erro ao sair.");
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])
    
    return {
        auth,
        createUser,
        login,
        logout,
        error,
        loading,
    }
};