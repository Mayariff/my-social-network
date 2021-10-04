import React from 'react';
import Profile from './Profile';
import {connect} from "react-redux";
import {getUserProfile, profileType} from "../../redux/Profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


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
        return <Profile {...this.props} profile={this.props.profile} />;
    }
}




//let AuthRedirectComponent = withAuthRedirect(ProfileContainer)


let mapStateToProps = (state:AppStateType ): MapStatePropsType => {
    return {
        profile: state.profilePage.profile}
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


//let WithURLDataContainerComponent = withRouter(AuthRedirectComponent)

//export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent);