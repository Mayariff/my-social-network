import React from 'react';
import loading from "../../assets/image/loading.gif"

const Preloader = (props: any) => {
    return (
        <div>
            <img src={loading} alt={"loading...please, wait"}/>
        </div>
    );
};

export default Preloader;