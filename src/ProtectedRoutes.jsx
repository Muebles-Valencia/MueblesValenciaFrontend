import React from 'react'
import { Outlet } from 'react-router'
import { Home } from './Component/Page/Home/Home'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
    const user = sessionStorage.getItem("usuario")
    let userAuth = {loggedIn : false}
    if (user != null || user != ""){
        userAuth = {loggedIn : true}
    }else if(user == null || user == ""){
        userAuth = {loggedIn : false}
    }
    return userAuth && userAuth.loggedIn;
}

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet/> : navigate("/");
}

export default ProtectedRoutes
