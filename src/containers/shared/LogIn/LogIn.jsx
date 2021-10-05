
import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './LogIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { actLogin, actLogInGG } from './module/action';
import { Redirect, useHistory } from 'react-router';
import Loader from '../../client/Loader/Loader';
import { NavLink } from 'react-router-dom';
import fire from '../../../Firebase/Firebase.js'
// import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from '../../../Firebase/Firebase.js';
import {firebase} from '../../../Firebase/Firebase'
import { LOGIN_SUCCESS, LOGIN_SUCCESS_GOOGLE } from './module/types';

export default function LogIn(props) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state
    const [user, setUser] = useState('')
    const dispatch = useDispatch()
    const onFinish = values => {
        dispatch(actLogin(values, props.history))
    }
      const handleLogin = () =>{
          var google_provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithPopup(google_provider).then(res=>{
            //   console.log(res);
            dispatch({
                type:LOGIN_SUCCESS_GOOGLE,
                payload:res
            })
          }).catch(err =>{
              alert(err)
          })
      }
      const handleLoginFacebook = () =>{
        var fb_provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(fb_provider).then(res=>{
            console.log(res);
        }).catch(err =>{
            alert(err)
        })
    }
    const {currentUser, loading, error} = useSelector(state => state.authReducer)
    return (
        <div style={{ height: '100vh'}}>
            <div style={{ position: 'fixed', top: '0', left: '0', bottom: '0', height: '100vh', width: '100%',backgroundImage: `url('https://tix.vn/app/assets/img/icons/bg2.jpg')`, position: 'fixed', backgroundSize: 'contain', backgroundPosition: 'center'  }} className="login_page">
                <div style={{ margin: '0 auto', display: 'flex', alignItems: 'center' }} className="SignIn">
                    <div style={{ width: '40%' }} className="bg_login">
                        <div className="title_signIn">
                            <h1 style={{ color: '#fff',fontWeight: '500' }} className="welcome_login">Welcome Back!</h1>
                            <p style={{ color: '#fff', fontWeight: '300', letterSpacing: '1px', }} className="wave">To keep connected with us please login with your personal info</p>
                        </div>
                    </div>
                    <div className="input_login">
                        <div className="moive_log">
                        <h1 className="text-center pt-8 pb-1" style={{ color: '#fff', fontWeight: 'bold', letterSpacing: '1px' }}>
                            SI<span style={{ color: '#CC3366' }}>G</span>N IN
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="icon">
                            <i class="fab fa-facebook-f"  style={{cursor:'pointer'}} onClick={handleLoginFacebook}></i>
                            <i class="far fa-envelope"></i>
                            <i class="fab fa-google-plus-g" onClick={handleLogin}></i>
                            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
                        </div>
                        <p style={{ color: '#fff', padding: '20px 0', fontSize: '16px', letterSpacing: '0.5px' }}>or use your account</p>
                        <span style={{color:'red', marginBottom:'10px'}}>{error}</span>
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
                                    <input placeholder='Enter your account' />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="matKhau"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="input__login">
                                    <i class="fas fa-unlock-alt" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your password' />
                                </div>
                            </Form.Item>
                            <Form.Item
                            >
                               <button className="btn-signIn mt-5" style={{ padding: '10px 35px', border: 'none', margin: '5px 0', borderRadius: '40px', color: 'white', background: 'linear-gradient(80deg, #CC3366 0%, #663366 100%)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '16px', outline:'none' }} type="primary"
                            htmlType="submit"
                            className="login-form-button">SIGN IN</button>
                            </Form.Item>
                        </Form>
                        <div >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#fff', fontSize: '16px', letterSpacing: '0.5px'}}>Not a user?<NavLink to="/register">
                            <button style={{ marginLeft: '3px', fontWeight: '600', color: '#fff', padding: '5px 12px', fontSize: '16px', letterSpacing: '1.5px' }}> RE<span style={{ color: '#CC3366' }}>G</span>ISTER</button>
                            </NavLink></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div style={{ width: '60%'}} className="input_login__sub">
                        <div className="moive_log">
                        <h1 className="text-center pt-8 pb-1" style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold', letterSpacing: '1px' }}>
                            SI<span style={{ color: '#CC3366' }}>G</span>N IN
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="icon">
                            <i class="fab fa-facebook-f"  style={{cursor:'pointer'}} onClick={handleLoginFacebook}></i>
                            <i class="far fa-envelope"></i>
                            <i class="fab fa-google-plus-g" onClick={handleLogin}></i>
                            {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
                        </div>
                        <p style={{ color: '#fff', padding: '20px 0', fontSize: '16px', letterSpacing: '0.5px' }}>or use your account</p>
                        <span style={{color:'red', marginBottom:'10px'}}>{error}</span>
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
                                    <input placeholder='Enter your account' />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="matKhau"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }} className="input__login">
                                    <i class="fas fa-unlock-alt" style={{ marginRight: '14px', fontSize: '20px', color: '#CC3366' }}></i>
                                    <input placeholder='Enter your password' />
                                </div>
                            </Form.Item>
                            <Form.Item
                            >
                               <button className="btn-signIn mt-5" style={{ padding: '10px 35px', border: 'none', margin: '5px 0', borderRadius: '40px', color: 'white', background: 'linear-gradient(80deg, #CC3366 0%, #663366 100%)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '16px', outline:'none' }} type="primary"
                            htmlType="submit"
                            className="login-form-button">SIGN IN</button>
                            </Form.Item>
                        </Form>
                        <div >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#fff', fontSize: '16px', letterSpacing: '0.5px'}}>Not a user?<NavLink to="/register">
                            <button style={{ marginLeft: '3px', fontWeight: '600', color: '#fff', padding: '5px 12px', fontSize: '16px', letterSpacing: '1.5px' }}> RE<span style={{ color: '#CC3366' }}>G</span>ISTER</button>
                            </NavLink></p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    )
}
