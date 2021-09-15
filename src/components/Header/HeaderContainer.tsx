import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {setAuthUserData} from "../../redux/Auth-reduser";



export type  MapStatePropsType ={
    id: number, email: string, login: string
}
type MapDispatchPropsType ={
    setAuthUserData: ( id: number, email: string, login: string)=> void
}
export type AuthPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<AuthPropsType> {
    componentDidMount() {

        axios.default.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
              if (response.data.resultCode ===0) {
                  let {id, email, login} = response.data.data
                  this.props.setAuthUserData(id, email,  login);
              }
            });
    }
    render() {
        return (
           <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {id: state.auth.id, email: state.auth.email, login: state.auth.login}

}
export default  connect(mapStateToProps,{setAuthUserData})(HeaderContainer);