import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function registerUser(ev){
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Regisrtation successful');
        } catch (e) {
            alert('Registration fail. You can try later');
        }
        
    }

    return (
        <div className="mt-4 flex flex-1 grow h-full items-center justify-around ">
            <div className="" >
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser} >
                    <input type="text" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)} ></input>
                    <input type="email" 
                        placeholder="your@email.com" 
                        value={email} 
                        onChange={ev => {setEmail(ev.target.value)}} />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} onChange={ev => {setPassword(ev.target.value)}} />
                    <button className="login">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>    
    );
}
// in className: "grow" or "flex-1" has the same effect on making the div full fill the remain height of parent, remember in parent must use both flex and flex-col + h-screen

