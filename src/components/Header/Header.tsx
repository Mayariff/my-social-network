import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Header.module.css'
import {AuthPropsType} from "./HeaderContainer";
import logo from './../../assets/image/logo.png'




const Header =(props:AuthPropsType) =>{

    return(
        <header className={classes.header}>

            <div className={classes.container}>
                <img src={logo}
                    alt={'logo'}/>
                <div className={classes.loginBlock}>
                    {props.isAuth
                        ?   <div className={classes.loginButtonMenu}>
                            <button onClick={props.logout} className={classes.loginButton}>Log out</button>
                            </div>
                        
                        : <NavLink to={'/login'}> Login </NavLink>}
                </div>
            </div>
        </header>
    )
}
export default Header;