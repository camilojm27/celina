import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import  firebase  from "./app";
import Auth from './auth'
const AuthContext = createContext({
    user: null,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.nookies = nookies;
        }
        return Auth.getAuth().onIdTokenChanged(async (user) => {
            console.log(`token changed!`);
            if (firebase.auth().currentUser == null) {
                console.log(`no token found...`);
                setUser(null);
                nookies.destroy(null, "token");
                return;
            }
            console.log('Si hay usuario? ', user)
            console.log(`updating token...`);
            const token = await  user.getIdToken()
            //Note: El context Provider USER tiene to-do el user, mientras que el COOKIE TOKEN solo el token
            // const token1 = await user.toJSON()
            // console.log(token1)

            setUser(user);
            nookies.destroy(null, "token");
            nookies.set(null, "token", token, {path: '/'});
        });
    }, []);

    // force refresh the token every 10 minutes
    // useEffect(() => {
    //     const handle = setInterval(async () => {
    //         console.log(`refreshing token...`);
    //         const user = firebase.auth().currentUser;
    //         if (user) await user.getIdToken(true);
    //     }, 10 * 60 * 1000);
    //     return () => clearInterval(handle);
    // }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};
