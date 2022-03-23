import React, {KeyboardEventHandler} from "react";
import s from './FormControle.module.css'
import {FieldValidatorType} from "../../../utilits/valid";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {LoginFormvaluesType} from "../../Login/Login";
import {ProfileFormvaluesType} from "../../Profile/ProfileInfo/ProfileInfo";


type FormControlType = {
    meta: WrappedFieldMetaProps
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
    const {input, meta, ...restProps} = props;
    const keyPressHandler: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.code === 'Enter') {
        }
    }

    return (<FormControl {...props}>
            <textarea {...input} {...restProps} onKeyPress={keyPressHandler}/>
        </FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>

    )
}

export function createField(placeholder: string | undefined,
                            name: LoginFormvaluesType | ProfileFormvaluesType,
                            validators: Array<FieldValidatorType>,
                            component: string | React.FC<WrappedFieldProps>,
                            props = {}, text: string = " ") {
    return (<div>
        <Field component={component}
               placeholder={placeholder}
               name={name}
               validate={validators}
               {...props}/>{text}
    </div>)
}