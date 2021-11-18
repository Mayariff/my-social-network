import React, {ChangeEvent, useEffect, useState} from 'react';

type propsType={
    status: string
    updateStatus: (status: string)=> void
}

 export const ProfileStatusWithHooks = (props:propsType ) => {

     const [editMode, setEditMode] = useState<boolean>(false)
     const [status, setStatus] = useState<string>(props.status)

     useEffect(()=>{
         setStatus(props.status)
     },[props.status])

     const ActiveMode=()=>{
         setEditMode(true)
     }
     const DeactiveMode=()=>{
         setEditMode(false)
         props.updateStatus(status);
     }

     const onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setStatus( e.currentTarget.value)
     }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={ActiveMode}> {status || '----'} </span>
            </div>}
            {editMode && <div>
                <input onBlur={DeactiveMode} onChange={onStatusChange}
                    autoFocus={true} value={status}/>
            </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;

