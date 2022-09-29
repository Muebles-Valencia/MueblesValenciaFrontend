import React,{useEffect} from 'react'
import { Logo } from '../../Ui/Logo/Logo'
import { InputHeader } from '../../Ui/InputHeader/InputHeader'
import { NavHome } from '../NavHome/NavHome'
import { SubHeader } from '../SubHeader/SubHeader'
import { NavBar } from '../SubHeader/NavBar'
// import { NavInfo } from '../../Ui/NavInfo/NavInfo'
import './MQuery360X740.css'

export const HeaderHome = () => {
  useEffect(() => {
    const user = sessionStorage.getItem("usuario")
    if (user != null || user != ""){
        console.log(document.getElementById("logout"));
        document.getElementById("logout").classList.remove("logoutHide")
        console.log("USUARIO");
        console.log(user);
        const user2 = JSON.parse(user.toString());
        document.getElementById("nameAccount").textContent = user2.nameU
    }else if(user == null || user == ""){
        document.getElementById("logout").classList.add("logoutHide")
    }
}, [])
  return (
    <div className='header-user'>
      <header className='header-main'>
        <div className='logoo'>
          {/* <div className='navinfo'>
            <NavInfo />
          </div> */}
          <Logo classN="title-main" />
         
        </div>
        <InputHeader />
        <NavHome />
      </header>
      <NavBar />
    </div>
  )
}
