import React from "react";
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import Ava from "../../../assets/image/user.jpg";
import {MapStatePropsType} from "../ProfileContainer";



const ProfileInfo =(props:MapStatePropsType ) =>{

  if (!props.profile.userId){
        return <Preloader />
    }
    return(
        <div >
            <div className={classes.containers}>
                <img
                    src="https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg"
                     alt="gory"/>
            </div>
          <div className={classes.descriptionBlock}>
      <img src={props.profile.photos.large ?  props.profile.photos.large: Ava}  alt={"large Avatar"}/>
                <span>{props.profile.aboutMe}</span>
                </div>
        </div>
    )
}
export default ProfileInfo;