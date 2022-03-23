import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    profileType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/Profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {FormDataType} from "./ProfileInfo/ProfileInfo";


export type MapStatePropsType = {
    profile: profileType
    status: string
    autorizedUserID: number | null,
    isAuth: boolean
}


type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
    saveProfile: (formData: FormDataType) => void
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & FormDataType
type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            if (this.props.autorizedUserID) {
                userId = this.props.autorizedUserID;
            } else {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
        />;
    }
}


//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorizedUserID: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)


//let WithURLDataContainerComponent = withRouter(AuthRedirectComponent)

//export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);