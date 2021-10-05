import React from 'react';
import {Field, reduxForm,InjectedFormProps} from "redux-form";

export type FormDataType={
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component={'input'} placeholder={'login'}  name={'login'}/>
            </div>
            <div>
                <Field component={'input'} placeholder={'password'} name={'password'}/>
            </div>
            <div>
                <Field component={'input'} type={"checkbox"} name={'rememberMe'}/>
                remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
)
};


export const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)
