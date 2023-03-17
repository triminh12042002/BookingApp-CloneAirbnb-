import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    // the below code make login page empty
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            alert('Login successfully')
            setRedirect(true);
        } catch (e){
            alert('Login failed');
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="mt-4 flex flex-1 grow h-full items-center justify-around ">
            <div className="" >
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit} >
                    <input type="email" placeholder="your@email.com" 
                        value={email} 
                        onChange={(ev) => {setEmail(ev.target.value)}} />
                    <input type="password" placeholder="password" 
                        value={password} 
                        onChange={ev => {setPassword(ev.target.value)}} />
                    <button className="login">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline" to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </div>    
    );
}
// in className: "grow" or "flex-1" has the same effect on making the div full fill the remain height of parent, remember in parent must use both flex and flex-col + h-screen

