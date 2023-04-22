import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    // ready will be true if the exist at least one time call the profile funtion, may be after login sucess
    useEffect( () => {
        // async function fetchdata() {
        //     if(!user) {
        //         const {data} = await axios.get('/profile');
        //         setUser(data);
        //     }
        // }
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            });
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
};

