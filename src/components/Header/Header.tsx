import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Header.module.css'
import {MapStatePropsType} from "./HeaderContainer";



const Header =(props:MapStatePropsType) =>{
    return(
        <header className={classes.header}>
            <img src="https://web.getmonero.org/press-kit/symbols/monero-symbol-480.png"
                 alt={'logo'}/>
            <div className={classes.loginBlock}>
                <NavLink to={'/login'}> Login </NavLink>
            </div>
        </header>
    )
}
export default Header;