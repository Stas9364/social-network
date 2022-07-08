import React from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: true,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({editMode: false});
    };

    deactivatedEditMode = () => {
        this.setState({editMode: true});
        this.props.updateStatus(this.state.status);
    };

    onChangeStatusUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {
                status: e.currentTarget.value
            });
    };

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    };

    render() {
        return (
            <div>

                {
                    this.state.editMode && <div>
                    <span
                        onDoubleClick={this.activateEditMode}
                    >{this.props.status || '...put status...'}</span>
                </div>
                }

                {
                    !this.state.editMode && <div>
                    <input
                        value={this.state.status}
                        onBlur={this.deactivatedEditMode}
                        autoFocus
                        onChange={ (e)=>this.onChangeStatusUpdate(e) }
                    />
                </div>
                }

            </div>
        );
    };
}

export default ProfileStatus;