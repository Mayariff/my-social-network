import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getAuthUserData, logout} from "../../redux/Auth-reduser";


export type  MapStatePropsType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type MapDispatchPropsType = {
    getAuthUserData: () => void
    logout: () => void
}
export type AuthPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<AuthPropsType> {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        id: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }

}

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);