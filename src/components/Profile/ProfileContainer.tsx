import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {getUserProfile, profileType, setUserProfile} from "../../redux/Profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {usersAPI} from "../../API/Api";


export type MapStatePropsType = {
    profile: profileType
}
type MapDispatchPropsType ={
    getUserProfile: (userId: string)=> void
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
            userId = '2';
        }
        this.props.getUserProfile(userId)
    }

    render() {
        console.log(this.props.profile)
        return <Profile {...this.props} profile={this.props.profile} />
    }
}

let mapStateToProps = (state:AppStateType ): MapStatePropsType => {
    return { profile: state.profilePage.profile} }

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);