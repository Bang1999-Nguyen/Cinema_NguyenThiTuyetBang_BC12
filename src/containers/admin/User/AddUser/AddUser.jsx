
import React, { Component, Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import axios from 'axios'
import Calendar from 'react-calendar';
import { Tabs, Radio, Space, Table, Tag } from 'antd';
import {
    Form,
    Input,
    Button,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import userApi from '../../../../apis/userApi';
import { toast } from 'react-toastify'
import { css } from 'glamor';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
toast.configure({
    toastClassName: css({
      fontSize: '18px !important',
      backgroundColor: 'red!important',
      padding: '18px !important'
    }),
});
export default function AddUser(props) {
    const { currentUser } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    }
    const [state, setState] = useState({
        email: '',
        matKhau: '',
        taiKhoan: '',
        hoTen: '',
        soDt: '',
        maLoaiNguoiDung: '',
        maNhom: ''
    })
    const wave = () => toast.success('Successfully Add User 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const waveFail = () => toast.warning('Failed to Add User 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isNotNumber, setIsNotNumber] = useState(false)
    const [isNumber, setIsNumber] = useState(false)
    const handleError = event => {
        let errorMess = '';
        const { name, value } = event.target;
        if (value === '') {
            errorMess = `${name} cannot be empty`
        }
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
                    errorMess = 'The length of password must be between 6 and 10';
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
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const showModal = () => {
        setVisible(true)
    };
    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setVisible(false)
        }, 2000);

    };
    const handleCancel = () => {
        setVisible(false)
    };
    const [user, setUser] = useState({});
    const onChange = e => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        if (isEmailValid === true && isPasswordValid === true && isNotNumber === true && isNumber === true) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setVisible(false)
            }, 2000);
            userApi.themNguoiDung(user).then(res => {
                wave()
                userApi.layDanhSachNguoiDung()
            }).catch(err => {
                waveFail()
            })
        }
    }
    const render = () => {
        return (
            <>
                <Form onSubmitCapture={handleOnSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    style={{ display: 'block', padding: '10px 0', width: '450px', height: '560px', background: '#ECF0F1', }}
                    className="form_add"
                >
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='taiKhoan' onChange={onChange} placeholder='Nhập tài khoản' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.taiKhoan !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.taiKhoan}</p> : ''}
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='hoTen' onChange={onChange} placeholder='Nhập họ và tên' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.hoTen !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.hoTen}</p> : ''}
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='email' onChange={onChange} placeholder='Nhập email' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.email !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.email}</p> : ''}
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='soDt' onChange={onChange} placeholder='Nhập số điện thoại' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.soDt !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.soDt}</p> : ''}
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='matKhau' onChange={onChange} placeholder='Nhập mật khẩu' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.matKhau !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.matKhau}</p> : ''}
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='maNhom' onChange={onChange} placeholder='Nhập mã nhóm' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.maNhom !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.maNhom}</p> : ''}
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='maLoaiNguoiDung' onChange={onChange} placeholder='Nhập mã loại người dùng' onKeyUp={handleError} onBlur={handleError} />
                    </Form.Item>
                    {state.maLoaiNguoiDung !== '' ? <p style={{ color: 'red', textAlign: 'center', margin: '-9px 0' }}>{state.maLoaiNguoiDung}</p> : ''}
                    <Form.Item style={{ textAlign: 'left', display: 'flex' }}>
                        <button style={{ padding: '10px 25px', display: 'flex', marginLeft: '160px', border: 'none', fontSize: '15px', color: '#fff', textAlign: 'left', backgroundColor: '#28a745', marginTop: '15px' }} type="submit" key="submit" loading={loading}>Thêm người dùng</button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    return (
        <>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '20px', height: '40px', width: '100px' }}>
                Add User
            </Button>
            <Modal
                visible={visible}
                title="Thêm người dùng"
                onOk={handleOk}
                onCancel={handleCancel}
                width={500} footer={null}>
                {render()}
            </Modal>
        </>
    );
}
