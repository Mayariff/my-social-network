import React from "react";
import s from './FormControle.module.css'


export  const TextArea= ({input, meta,...props}:any)=> {
    const hasError =meta.touched && meta.error;
    return (
        <>
            <div className={hasError ? `${s.formControl} ${s.error}` : `${s.formControl}`}>
                <div>
                    <textarea {...input} {...props}/>
                </div>
                {hasError && <span>ERROR</span>}
            </div>
        </>

    )
}


export  const Input= ({input, meta,...props}:any)=> {
    const hasError =meta.touched && meta.error;
    return (
        <>
            <div className={hasError ? `${s.formControl} ${s.error}` : `${s.formControl}`}>
                <div>
                    <input {...input} {...props}/>
                </div>
                {hasError && <span>ERROR</span>}
            </div>
        </>

    )

}