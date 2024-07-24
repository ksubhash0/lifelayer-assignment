import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { useReducer } from "react";

import {AuthContext, AuthDispatchContext} from './context/AuthContext';
import {authReducer} from './reducers/authReducer';

import Layout from './component/Layout';
import Login from './pages/Login';
import Singin from './pages/Signin';
import Home from './pages/Home';
import Add from "./pages/Add";
import View from "./pages/View";
import Edit from "./pages/Edit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {verifyLogin} from './http';
import { useEffect } from "react";

const authRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/view-candidate/:id',
        element: <View />
      },
      {
        path: '/edit-candidate/:id',
        element: <Edit />
      },
      {
        path: '/add-candidate',
        element: <Add />
      }
    ]
  }
]);

const unAuthRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/signin',
        element: <Singin />
      }
    ]
  }
])


function App() {

  const [auth, dispatch] = useReducer(authReducer, {_id: '', name: '', email: '', mobile: '', loading: true})



  useEffect(() => {
    const chechAuth = async () => {
      try {
        const {data} = await verifyLogin();
        if(data.auth == false){
          dispatch({type: 'notauthenticated'})
        }else{
          dispatch({type: 'login', user: data.user});
        }
      } catch (error) {
        console.log(error)
        dispatch({type: 'notauthenticated'})
    
      }
    }
    chechAuth();
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <AuthDispatchContext.Provider value={dispatch}>
          {auth.loading ? (
            <div style={{width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p className="text">Loading...</p>
        </div>
          ) : <RouterProvider router={auth._id ? authRoutes : unAuthRoutes} />}
          <ToastContainer style={{zIndex: '9999999999'}} />
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
