import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Header.module.css'
import {AuthPropsType} from "./HeaderContainer";



const Header =(props:AuthPropsType) =>{
    return(
        <header className={classes.header}>
            <img src="https://web.getmonero.org/press-kit/symbols/monero-symbol-480.png"
                 alt={'logo'}/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}> Login </NavLink>}
            </div>
        </header>
    )
}
export default Header;