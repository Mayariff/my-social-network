import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/formControls/formControls";
import {RequiredField} from "../../utilits/valid";
import s from '../common/formControls/FormControle.module.css'
import {FormDataType} from "./Login";


export type forCapchaType = {
    captcha?: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType, forCapchaType> & forCapchaType> =
    ({handleSubmit, error}) => {
        return (
            <form onSubmit={handleSubmit}>
                {createField('email', 'email', [RequiredField], Input)}
                {createField('password', 'password', [RequiredField], Input, {type: "password"})}
                {createField("checkbox", 'rememberMe', [], Input, {text: 'remember me', type: "checkbox"})}
                {error && <div className={s.formSMRError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    };


export const LoginReduxForm = reduxForm<FormDataType, forCapchaType>({
    form: 'login'
})(LoginForm)
