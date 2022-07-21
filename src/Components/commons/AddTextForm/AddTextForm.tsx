import React from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';

type TextFormProps = {
    onClick: (data: string) => void
    btnStyle?: string
    btnName: string
}
type TextAreaType = {
    text: string
}

export const AddTextForm = React.memo((props: TextFormProps) => {
    const {
        control,
        handleSubmit,
        register,
        reset
    } = useForm<TextAreaType>();

    const onSubmit: SubmitHandler<TextAreaType> = (data) => {
        props.onClick(data.text);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
                name='text'
                control={control}
                render={() => (
                    <textarea
                        {...register('text',
                            {})}
                    />
                )}
            />

            <button
                type="submit"
                className={props.btnStyle}
            >{props.btnName}</button>

        </form>
    );
});


