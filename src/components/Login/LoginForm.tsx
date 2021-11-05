import React from 'react';
import {Field, reduxForm,InjectedFormProps} from "redux-form";
import { Input} from "../common/formControls/formControls";
import {RequiredField} from "../../utilits/valid";
import s from '../common/formControls/FormControle.module.css'
import {FormDataType} from "./Login";



export type forCupchaType ={

}

export const LoginForm: React.FC<InjectedFormProps<FormDataType,forCupchaType>&forCupchaType> = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component={Input} placeholder={'email'}  name={'email'}
                       validate={[RequiredField]}/>
            </div>
            <div>
                <Field component={Input} placeholder={'password'} name={'password'} type={"password"}
                       validate={[RequiredField]}/>
            </div>
            <div>
                <Field component={Input} type={"checkbox"} name={'rememberMe'}/>
                remember me
            </div>
          {props.error && <div className={s.formSMRError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
)
};


export const LoginReduxForm = reduxForm<FormDataType, forCupchaType>({
    form: 'login'
})(LoginForm)
