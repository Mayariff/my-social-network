import React from 'react';
import Profile from './Profile';
import * as axios from "axios";
import {connect} from "react-redux";
import {profileType, setUserProfile} from "../../redux/Profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";


export type MapStatePropsType = {
    profile: profileType
}
type MapDispatchPropsType ={
    setUserProfile: (profile: profileType)=> void
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
        axios.default.get('https://social-network.samuraijs.com/api/1.0/profile/'+userId)
            .then(response => {
                this.props.setUserProfile(response.data);
                })
    }

    render() {
        console.log(this.props.profile)
        return <Profile {...this.props} profile={this.props.profile} />
    }
}

let mapStateToProps = (state:AppStateType ): MapStatePropsType => {
    return { profile: state.profilePage.profile} }

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent);