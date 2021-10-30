import React from 'react';
import {Field, reduxForm,InjectedFormProps} from "redux-form";
import {Input} from "../common/formControls/formControls";
import {RequiredField} from "../../utilits/valid";

export type FormDataType={
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component={Input} placeholder={'login'}  name={'login'}
                       validate={[RequiredField]}/>
            </div>
            <div>
                <Field component={Input} placeholder={'password'} name={'password'} validate={[RequiredField]}/>
            </div>
            <div>
                <Field component={Input} type={"checkbox"} name={'rememberMe'}/>
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
