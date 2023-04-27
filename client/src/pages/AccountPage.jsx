import axios from "axios";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import UserPlacePage from "./UserPlacePage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage, action } = useParams();
    // console.log(subpage);

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        return <Navigate to='/' />
    }
    // /messages/t/3257868267595659/


    // ready : already login, but not yet load user

    // not ready: did not get any data before -> not call get('/profile') method 
    if (!ready) {
        return 'Loading........';
    }
    // have call before, but user is not exist -> login again
    if (ready && !user) {
        return <Navigate to={'/login'} />
    }
    // now user exist




    

    return (
        <div>
           <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <br />
                    <button onClick={logout} className="bg-primary rounded-full px-4 py-2 text-white" >Logout</button>
                </div>)}
            {subpage === 'places' && (
                <UserPlacePage />
            )}
        </div>
    );
}