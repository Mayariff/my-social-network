import FriendsBlock from "./FriendsBlock";
import {connect} from "react-redux";
import {friendType} from "../../../redux/Navbar-reducer";
import {AppStateType} from "../../../redux/redux-store";


type mapStateToPropsType= {
    friends: Array<friendType>
}
const  mapStateToProps=(state:AppStateType):mapStateToPropsType => {
    return {
       friends: state.navbarBlock.friends
    }
}


/*const mapDispatchToProps =(dispatch:any)=>{
    return{  }
    }*/


export const FriendsBlockContainer = connect(mapStateToProps)(FriendsBlock)

export default FriendsBlockContainer