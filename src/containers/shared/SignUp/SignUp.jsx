import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify'
import './SignUp.css'
import { NavLink } from 'react-router-dom';
import { actSignUp } from './module/action';

export default function SignUp(props) {
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isNotNumber, setIsNotNumber] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    const [state, setState] = useState({
        email: '',
        matKhau: '',
        hoTen: '',
        soDt:''
    })
    const dispatch = useDispatch()
    const onFinish = values => {
        values.maNhom = 'GP15'
        if (isEmailValid === true && isPasswordValid === true && isNotNumber === true && isNumber === true) {
            dispatch(actSignUp(values, props.history))
        }
    }
    const handleOnChange = (event) => {
        const { name, value } = event.target;
    }
    const { errorSignUp} = useSelector(state => state.authReducer)
    const handleError = (event) => {
        let errorMess = '';
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
                if (value !== '' && !value.match(emailRegex)) {
                    errorMess = 'Invalid Email';
                }
                if (errorMess === '') {
                    setIsEmailValid(true)
                } else {
                    setIsEmailValid(false)
                }
                break;
            case 'matKhau':
                if (value !== '' && (value.length < 3 || value.length >= 10)) {
                    errorMess = 'The length of password must be between 3 and 10';
                }
                if (errorMess === '') {
                    setIsPasswordValid(true)
                } else {
                    setIsPasswordValid(false)
                }
                break;
            case 'hoTen':
                const letter = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
                if (value !== '' && !value.match(letter)) {
                    errorMess = 'Fullname is not include number';
                }
                if (errorMess === '') {
                    setIsNotNumber(true)
                } else {
                    setIsNotNumber(false)
                }
                break;
            case 'soDt':
                const isNumeric = /^\d+$/;
                if (value !== '' && !value.match(isNumeric)) {
                    errorMess = 'Phone number must be include only number';
                }
                if (errorMess === '') {
                    setIsNumber(true)
                } else {
                    setIsNumber(false)
                }
                break;
            default:
                break;
        }
        setState({
            ...state,
            [name]: errorMess
        })
    }
    return (
        <div style={{ height: '100vh'}}>
            <div style={{ top: '0', left: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.5)', height: '100vh', width: '100%',backgroundImage: `url('https://tix.vn/app/assets/img/icons/bg2.jpg')`, position: 'fixed', backgroundSize: 'contain', backgroundPosition: 'center' }} className="login_page">
                <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center' }} className="SignUp">
                    <div style={{ width: '40%' }} className="bg_login">
                        <div className="title_signIn">
                            <h1 style={{ color: '#fff', fontWeight: '500' }} className="welcome_login">Hello, Friend!</h1>
                            <p style={{  color: '#fff', fontWeight: '300', letterSpacing: '1px', }} className="wave">Enter your personal details and start journey with us</p>
                        </div>
                    </div>
                    <div className="input_login">
                    <div className="movie_log">
                        <h1 className="text-center pt-8 pb-1" style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', letterSpacing: '1px' }}>
                            SI<span style={{ color: '#CC3366' }}>G</span>N UP
                        </h1>
                        {/* <span style={{color:'red', marginBottom:'10px'}}>{ errorSignUp}</span> */}
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                            validateTrigger="onBlur"
                        >
                            <Form.Item
                                name="taiKhoan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="input__login">
                                    <i class="far fa-user" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your account'  onKeyUp={handleError} onChange={handleOnChange} name="taiKhoan" />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    }
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="input__login">
                                    <i class="fas fa-envelope-open-text" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your email'  onKeyUp={handleError} onChange={handleOnChange} name="email" />
                                </div>
                            </Form.Item>
                            {state.email !== '' ? <p style={{ color: 'red', margin: '-20px 0 -2px 0' }}>{state.email}</p> : ''}
                            <Form.Item
                                name="matKhau"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }} className="input__login">
                                    <i class="fas fa-unlock-alt" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your password'  onKeyUp={handleError} onChange={handleOnChange} name="matKhau" />
                                </div>
                            </Form.Item>
                            {state.matKhau !== '' ? <p style={{ color: 'red', margin: '-20px 0 -2px 0' }}>{state.matKhau}</p> : ''}
                            <Form.Item
                                name="hoTen"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your fullname!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }} className="input__login mr-3">
                                    <i class="fas fa-signature" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your fullname' onKeyUp={handleError} onChange={handleOnChange} name="hoTen" />
                                </div>
                            </Form.Item>
                            {state.hoTen !== '' ? <p style={{ color: 'red', margin: '-20px 0 -2px 0' }}>{state.hoTen}</p> : ''}
                            <Form.Item
                                name="soDt"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }} className="input__login">
                                    <i class="fas fa-mobile-alt" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your phone'  onKeyUp={handleError} onChange={handleOnChange} name="soDt" />
                                </div>
                            </Form.Item>
                            {state.soDt !== '' ? <p style={{ color: 'red', margin: '-20px 0 -2px 0' }}>{state.soDt}</p> : ''}
                            <Form.Item
                            >
                                <button className="btn-signIn mt-5" style={{ padding: '10px 35px', border: 'none', margin: '5px 0', borderRadius: '40px', color: 'white', background: 'linear-gradient(80deg, #CC3366 0%, #663366 100%)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '16px' }} type="primary"
                                    htmlType="submit"
                                    className="login-form-button">SIGN UP</button>
                            </Form.Item>
                        </Form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
