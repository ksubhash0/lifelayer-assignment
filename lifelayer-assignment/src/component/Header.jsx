import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthDispatchContext, AuthContext } from "../context/AuthContext";
import { logount } from "../http";
import { ToastContainer, toast } from 'react-toastify';


export default function Header () {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const dispatch = useContext(AuthDispatchContext)

    const onLogout = async () => {
  
        try {
            const {data} = await toast.promise(
                logount(),
                {
                  pending: 'Logging out..',
                  success: 'Logged Out',
                }
            )
            dispatch({type: 'logout'})
            navigate('/')
            
        } catch (error) {
            console.log(error)
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
        <section id="header">
            <div className="my-container">
                <div className="header">
                   <div className="header-left">
                       <h1 className="logo">Lifelayer</h1>
                    </div> 
                    <div className="header-right" style={{display: 'flex'}}>
                        <p className="text">Welcome {auth._id ? auth.name : "Guest"}</p>
                        {auth._id && <p onClick={onLogout} className="link">Logout</p>}
                    </div>
                </div>
            </div>
        </section>
    )
}