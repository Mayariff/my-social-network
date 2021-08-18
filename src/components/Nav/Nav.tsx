import React from "react";
import  classes from './Nav.module.css'
import {NavLink} from "react-router-dom";
import FriendsBlock from "./FriendsBlock/FriendsBlock";
import {navbarBlockType} from "../../redux/store";
import {FriendsBlockContainer} from "./FriendsBlock/FriendsBlockContainer";


const Nav =(props: any) =>{
    return(
            <nav className={classes.nav}>
                <div className={classes.item}><NavLink to="/profile"> Profile</NavLink></div>
                <div className={classes.item}><NavLink to="/dialogs"> Messages</NavLink></div>
                <div className={classes.item}><NavLink to="/news"> News</NavLink></div>
                <div className={classes.item}><NavLink to="/music"> Music</NavLink></div>
                <div className={classes.item}><NavLink to="settings"> Settings</NavLink></div>
                <FriendsBlockContainer />
            </nav>

    )
}
export default Nav;