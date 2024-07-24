import Header from "./Header"
import {Outlet, useNavigate} from 'react-router-dom';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {

  const auth = useContext(AuthContext);
 

 
    return (
       <div className="page">
         <Header />
         {<Outlet />}
       </div> 
    )
}