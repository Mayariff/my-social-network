import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css'

type propsType = {
    status: string
    updateStatus: (status: string) => void
    isOwner?: boolean
}

export const ProfileStatusWithHooks = (props: propsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const ActiveMode = () => {
        props.isOwner && setEditMode(true)
    }
    const DeactiveMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.status}>
            {!editMode &&
                <span onDoubleClick={ActiveMode}> {status || '----'} </span>}
            {editMode && props.isOwner &&
                <input onBlur={DeactiveMode} onChange={onStatusChange}
                       autoFocus={true} value={status} className={s.statusInput}/>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;

