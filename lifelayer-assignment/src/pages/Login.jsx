import { NavLink } from "react-router-dom";


import { loginUser } from "../http";
import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validator";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthDispatchContext } from "../context/AuthContext";

export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const navigate = useNavigate();
    const dispatch = useContext(AuthDispatchContext)

    const handleLogin = async () => {

        try {

            const {data} = await toast.promise(
            loginUser({
               email,
               password
            }),
            {
                pending: 'Logging in..',
                success: 'Logged in'
            }
        )
        dispatch({type: 'login', user: data.user});
        navigate('/')
            
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
        
    }

    return (
        <div className="login-page">
            <div className="card auth-card">
                <h1 className="heading-primary">Login</h1>
                <div className="form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label><br/>
                        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Password</label><br/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="input" type="password" id="email" />
                    </div>
                    <div className="auth-reverse">
                        <p className="text">Don't have an account?</p>
                        <p><NavLink to={'/signin'}>SignUp</NavLink></p>
                    </div>
                    <button className="btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}