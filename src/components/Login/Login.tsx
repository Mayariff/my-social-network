
import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reduser";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";


type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string |null
}

type mapDispatchPropsType={
    login:(email:string, password:string, rememberMe:boolean, captcha:string|null)=>void
}
export type FormDataType={
    email: string
    password: string
    rememberMe: boolean
    captcha:string|null
}

export type LoginFormvaluesType = keyof FormDataType
const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = (props) => {
    const  onSubmit=(formData: FormDataType)=>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
        console.log(formData)
    }

    if (props.isAuth){
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps= (state:AppStateType):mapStateToPropsType=>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps,{login})(Login);