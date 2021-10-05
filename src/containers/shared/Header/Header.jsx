import React, { Component, Suspense, useState } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { Select } from 'antd';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _, { transform } from 'lodash'
import { actLogout } from '../LogIn/module/action';
import './Header.css'
const { Option } = Select;
export default function Header(props) {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.authReducer)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
        setDisplay(false)
    };
    const close = () =>{
        window.scrollTo(0, 0);
        setDisplay(false)
    }
    const handleOk = () => {
        setIsModalVisible(false);
        setTimeout(() => {
            dispatch(actLogout())
        }, 2000);
        setTimeout(() => {
            <Redirect to="/" />
        }, 3000);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  const [display, setDisplay] = useState(false)
    const renderLogIn = () => {
        if (_.isEmpty(currentUser)) {
            return <div>
                <Link className="self-center px-8 py-3 rounded mr-2" to="/logIn" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none', padding: "9px 22px", background: "transparent", borderRadius: '5%', color: 'white', fontSize: '14px', border: '0.5px solid white' }}>Sign In</Link>
                <Link className="self-center px-0 py-3 rounded" to="/register" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none', padding: "9px 22px", background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)", borderRadius: '5%', color: 'white', fontSize: '14px' }}>Sign Up</Link>
            </div>
        } else {
            return <div>
                <Link className="account self-center px-4 py-3 rounded" to="/" style={{ borderRight: '1px solid gray', color: 'white' }}>Hello ! {currentUser.taiKhoan}</Link>
                <a className="self-center px-0 py-3 rounded ml-3" onClick={showModal} style={{ textDecoration: 'none', padding: "9px 22px", background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)", borderRadius: '5%', color: 'white', fontSize: '14px' }}>Log Out</a>
            </div>
        }
    }
    return (
        <Suspense fallback="loading">
            <header className="p-3 bg-gray-900 bg-opacity-60 text-white shadow-2xl fixed w-full z-10" style={{position:'flex', left:0, top:0}}>
                <div className="container flex justify-between h-16 mx-auto">
                    <a href="#" aria-label="Back to homepage" className="flex items-center p-2">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
                    </a>
                    <ul className="items-stretch hidden space-x-3 lg:flex">
                        <li className="flex">
                            <Link href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white border-violet-600" to="/">Home</Link>
                        </li>
                        <li className="flex">
                            <Link className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white border-violet-600" to={!currentUser ? '/' : '/profile'} onClick={() => window.scrollTo(0, 0)}>Profile</Link>
                        </li>
                        <li className="flex">
                            <a href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white">News</a>
                        </li>
                        <li className="flex">
                            <a href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white">About</a>
                        </li>
                    </ul>
                    <div className="items-center flex-shrink-0 hidden lg:flex">
                        {renderLogIn()}
                    </div>
                    <button className="p-4 lg:hidden" onClick={() => setDisplay(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {
                        display ? <div className="mobile_nav lg:hidden" >
                        <ul className="py-5 px-3">
                            <li className="flex" style={{margin:'7px 0'}}>
                                <Link href="#" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black border-violet-600" to="/" onClick={() => setDisplay(false)}>Home</Link>
                            </li>
                            <li className="flex" style={{margin:'7px 0'}}>
                                <Link className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black border-violet-600" to={!currentUser ? '/' : '/profile'} onClick={() => close() }>Profile</Link>
                            </li>
                            <li className="flex" style={{margin:'7px 0'}}>
                            <Link className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black border-violet-600" to="/logIn" onClick={() => close()} >Sign In</Link>
                            </li>
                            <li className="flex" style={{margin:'7px 0'}}>
                            <Link className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-black border-violet-600" to='./' onClick={showModal}>Log out</Link>
                            </li>
                        </ul>
                        <i class="fas fa-times"  onClick={() => setDisplay(false)}></i>
                        </div> : ''
                    }
                </div>
            </header>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} title={null}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <img src="https://media1.giphy.com/media/U6eaFPHjUomDS7dkAU/source.gif" style={{ width: '150px', height: '150px' }}></img>
                    <h2 className="text-xl font-bold py-2 ">Are you sure?</h2>
                    <p className=" text-gray-500 px-8 text-center" style={{ fontSize: '16px' }}>Do you really want to log out your account?
                        This process cannot be undone</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ textDecoration: 'none', padding: "9px 22px", background: "transparent", borderRadius: '5%', color: 'black', fontSize: '14px', marginRight: '10px', fontWeight: '600' }} className="no_say" onClick={handleCancel}>NO</button>
                    <button style={{ textDecoration: 'none', padding: "9px 22px", background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)", borderRadius: '5%', color: 'white', fontSize: '14px', fontWeight: '600' }} onClick={
                        handleOk} className="no_say">YES</button>
                </div>
            </Modal>
        </Suspense>
    )
}
