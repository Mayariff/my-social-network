import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {getStatus, getUserProfile, profileType, updateStatus} from "../../redux/Profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";



export type MapStatePropsType = {
    profile: profileType
    status: string
    autorizedUserID: number|null,
    isAuth: boolean
}


type MapDispatchPropsType ={
    getUserProfile: (userId: string)=> void
    getStatus:(userId: string)=>void
    updateStatus:(status: string)=>void
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType
type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType
class ProfileContainer extends React.Component<PropsType>{

    componentDidMount() {
        let userId= this.props.match.params.userId;
        if(!userId){
            let userId1 = this.props.autorizedUserID;
            debugger
            if(userId1){
            userId = userId1.toString();}

        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}/>;
    }
}




//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


let mapStateToProps = (state:AppStateType ): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorizedUserID: state.auth.userId,
         isAuth: state.auth.isAuth}
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)


//let WithURLDataContainerComponent = withRouter(AuthRedirectComponent)

//export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);