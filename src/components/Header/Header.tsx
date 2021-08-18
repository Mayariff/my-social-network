import React from "react";
import classes from './Header.module.css'

const Header =() =>{
    return(
        <header className={classes.header}>
            <img src="https://web.getmonero.org/press-kit/symbols/monero-symbol-480.png"
                 alt={'logo'}/>
        </header>
    )
}
export default Header;