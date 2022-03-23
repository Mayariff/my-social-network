import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reduser";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from './Login.module.css'
import logo from "../../assets/image/logo.png";


type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export type LoginFormvaluesType = keyof FormDataType
const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = (props) => {

    const getInitialValues =()=> {
        return {
            email: '79027972026@yandex.ru',
            password: '19051991',
        };
    }


    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <>
            <h1>LOGIN</h1>
            <div className={style.container}>
                <div className={style.info}>
                    <img src={logo}
                         alt={'logo'}/>
                    <div className={style.text}> Connect with friends and the world around you on Socialite.</div>
                </div>
                <div className={style.loginFormContainer}>
                    <LoginReduxForm onSubmit={onSubmit} captcha={props.captchaUrl} initialValues={getInitialValues()}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);