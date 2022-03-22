import React from 'react';
import s from './UnderConstructionPage.module.css'
import panda from '../../../assets/image/000-404.png'

type propsType= {
    title: string
}
const UnderConstructionPage = ({title}: propsType) => {
    const  image= {
        backgroundImage: `url(${panda})`
    }
    return (
        <div>
            <h1> {title}</h1>
            <div className={s.container} >
                <div>
                    <span className={s.sorry}> Sorry,</span>
                    <div> page {title} is being developed...</div>
                </div>
                <div className={s.img} style={image}> </div>
            </div>

        </div>
    );
};

export default UnderConstructionPage;