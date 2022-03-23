import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/formControls/formControls";
import {RequiredField} from "../../utilits/valid";
import s from '../common/formControls/FormControle.module.css'
import {FormDataType} from "./Login";
import style from './Login.module.css'


export type forCaptchaType = {
    captcha: string | null
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType, forCaptchaType> & forCaptchaType> =
    ({handleSubmit, error, captcha}) => {

        return (
            <form onSubmit={handleSubmit} className={style.loginForm}>
                <div className={style.fields}>
                    {createField('email', 'email', [RequiredField], Input, {type: "email"})}
                    {createField('password', 'password', [RequiredField], Input, {type: "password"})}
                    <label className={style.checkbox}>
                        {createField("checkbox", 'rememberMe', [], Input, {text: 'remember me', type: "checkbox"})}
                        <div className={style.labelText}>Remember me</div>
                    </label>
                </div>
                <div className={style.captchaField}>
                    {captcha && <img src={captcha} alt={'captcha'}/>}
                    {captcha &&
                        createField('Symbols from image', 'captcha', [RequiredField], Input, {type: "text"})}
                </div>
                {error && <div className={s.formSMRError}>
                    {error}
                </div>}
                <div className={style.buttonMenu}>
                    <button className={style.loginButton}>Login</button>
                </div>
            </form>
        )
    };


export const LoginReduxForm = reduxForm<FormDataType, forCaptchaType>({
    form: 'login'
})(LoginForm)
