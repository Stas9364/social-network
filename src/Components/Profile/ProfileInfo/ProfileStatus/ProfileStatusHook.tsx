import React, {useEffect, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusHook: React.FC<ProfileStatusPropsType> = ({
                                                                        status,
                                                                        updateStatus
                                                                    }) => {
    const [editMode, setEditMode] = useState(false);
    const [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivatedEditMode = () => {
        setEditMode(false);
        updateStatus(localStatus);
    };

    const onStatusUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value);
    };

    return (
        <div>

            {
                !editMode && <div>
                <span
                    onDoubleClick={activateEditMode}
                >
                    {status || '...put status...'}
                </span>
                </div>
            }

            {
                editMode && <div>
                    <input
                        onChange={(e) => onStatusUpdate(e)}
                        onBlur={deactivatedEditMode}
                        value={localStatus}
                        autoFocus
                    />
                </div>
            }

        </div>
    );
};


