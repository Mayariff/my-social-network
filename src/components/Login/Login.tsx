import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reduser";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";


type mapStateToPropsType = {
    isAuth: boolean
}

type mapDispatchPropsType={
    login:(email:string, password:string, rememberMe:boolean)=>void
}
export type FormDataType={
    email: string
    password: string
    rememberMe: boolean
}

/*type loginFormPropertisType = 'email'|  'password' |'rememberMe'*/
export type LoginFormvaluesType = keyof FormDataType

const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = (props) => {
    const  onSubmit=(formData: FormDataType)=>{
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth){
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps= (state:AppStateType):mapStateToPropsType=>({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login);