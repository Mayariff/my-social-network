import React from "react";
import s from './FormControle.module.css'
import {FieldValidatorType} from "../../../utilits/valid";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {LoginFormvaluesType} from "../../Login/Login";


/*export  const TextArea= ({input, meta,...props}:any)=> {
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
}*/
/*export  const Input= ({input, meta,...props}:any)=> {
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

}*/


type FormControlType = {
    meta: WrappedFieldMetaProps
    /*touched:boolean
    error: string*/
}

export const FormControl: React.FC<FormControlType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (<div className={hasError ? `${s.formControl} ${s.error}` : `${s.formControl}`}>
            <div>
                {children}
            </div>
            {hasError && <span>ERROR</span>}
        </div>
    )
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    /*const {input, meta, child,...restProps} =props;*/
    const {input, meta, ...restProps} = props;
    return (<FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>

    )
}



export function createField(placeholder: string| undefined,
                            name: LoginFormvaluesType,
                            validators: Array<FieldValidatorType>,
                            component: string | React.FC<WrappedFieldProps>,
                            props = {}, text: string = " "){
    return (<div>
        <Field component={component}
               placeholder={placeholder}
               name={name}
               validate={validators}
               {...props}/>{text}
    </div>)
}