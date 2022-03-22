import React from 'react';
import loading from "../../../assets/image/loading.gif"
import s from './Prelouder.module.css'

const Preloader = (props: any) => {
    return (
        <div className={s.position}>
            <img src={loading} alt={"loading...please, wait"}/>
        </div>
    );
};

export default Preloader;