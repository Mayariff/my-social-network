import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/Auth-reduser";




export type  MapStatePropsType ={
    id: number, email: string, login: string
}
type MapDispatchPropsType ={
    getAuthUserData:()=>void
}
export type AuthPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<AuthPropsType> {
    componentDidMount() {
       this.props.getAuthUserData();
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
export default  connect(mapStateToProps,{getAuthUserData})(HeaderContainer);