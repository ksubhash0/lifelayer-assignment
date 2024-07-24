import { NavLink } from "react-router-dom";
import { signInUser } from "../http";
import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validator";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthDispatchContext } from "../context/AuthContext";


export default function Signin () {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useContext(AuthDispatchContext)

    const handleSignin = async () => {

        if(!name){
            toast.error('Name is required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        if(!validateEmail(email)){
            toast.error('Invalid Email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        if(!validatePassword(password)){
            toast.error('Password must be at least 5 character long', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        if(password != confirm_password){
            toast.error('Password not mach', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }

        try {

            const {data} = await toast.promise(
            signInUser({
               name,
               email,
               password,
               confirm_password
            }),
            {
                pending: 'Signing in..',
                success: 'Singned in'
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
                    <label htmlFor="name">Name</label><br/>
                    <input className="input" value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label><br/>
                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label><br/>
                    <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
                </div>
                <div className="input-group">
                    <label htmlFor="c_password">Confirm Password</label><br/>
                    <input className="input" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="c_password" />
                </div>
                <div className="auth-reverse">
                    <p className="text">Already have an account?</p>
                    <p><NavLink to={'/'}>login</NavLink></p>
                </div>
                <button className="btn-primary" onClick={handleSignin}>Signin</button>
            </div>
        </div>
    </div>
    )
}