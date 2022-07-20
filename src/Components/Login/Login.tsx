import React from 'react';
import {connect} from 'react-redux';
import {login} from '../../Redux/authReducer';
import {SubmitHandler, useForm} from 'react-hook-form';
import {AppStateType} from '../../Redux/reduxStore';
import {Navigate} from 'react-router-dom';

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    errOne: boolean
    captchaURL: string | null
}
type MapStatePropsType = {
    isAuth: boolean
    errOne: boolean
    captchaURL: string | null
}

const Login = (props: LoginPropsType) => {

    if (props.isAuth) {
        return <Navigate to='/profile'/>;
    }

    if (props.errOne) {
        alert('Incorrect Email or Password');
    }

    return (
        <>
            <h1 style={{color: 'white'}}>LOGIN</h1>
            <LoginForm
                login={props.login}
                captchaURL={props.captchaURL}
            />
        </>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.authorization.isAuth,
        errOne: state.authorization.isErrOne,
        captchaURL: state.authorization.captchaUrl
    };
};

export default connect(mapStateToProps, {login})(Login);


///////////LoginForm

type Inputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    captchaURL: string | null
}

const LoginForm = (props: LoginFormPropsType) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField
    } = useForm<Inputs>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        props.login(data.email, data.password, data.rememberMe, data.captcha);
        resetField('password');
        resetField('captcha');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        {...register('email',
                            {
                                required: 'Required',
                                pattern: {
                                    value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                                    message: 'Enter correct email'
                                }
                            })}
                        type="text"
                        placeholder='Email'
                    />
                    {errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                </div>

                <div>
                    <input
                        {...register('password',
                            {
                                required: 'Required',
                            }
                        )}
                        type='password'
                        placeholder='Password'
                        autoComplete='on'
                    />
                    {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
                </div>

                <div>
                    <input {...register('rememberMe')} type="checkbox" title={'Remember me'}/>
                    <span>Remember me</span>
                </div>

                <button>Login</button>

                {props.captchaURL
                    ? <div>
                        <img src={props.captchaURL} alt={'captcha'}/>
                        <div>
                            <input
                                {...register('captcha')}
                                type='text'
                            />
                        </div>
                      </div>
                    : ''
                }
            </form>
        </>
    );
};