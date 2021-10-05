
import React, { Component, Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import { useFormik } from 'formik';
import moment, { isMoment } from 'moment'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import axios from 'axios'
import { Tabs, Radio, Space, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
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
import { toast } from 'react-toastify'
import { css } from 'glamor';
import userApi from '../../../../apis/userApi';
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
export default function EditUser(props) {
    const wave = () => toast.success('Successfully Edit User 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const waveFail = () => toast.warning('Failed to Edit User 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector(state => state.UserAdmin)
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: user?.taiKhoan,
            hoTen: user?.hoTen,
            email: user?.email,
            soDt: user?.soDt,
            matKhau:user?.matKhau,
            maNhom: 'GP15',
            maLoaiNguoiDung: user?.maLoaiNguoiDung
        },
        onSubmit: (values) => {
            userApi.capNhatNguoiDung(values).then(res =>{
                wave()
            }).catch(err =>{
               waveFail()
            })
        }
    })
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setVisible(false)
        }, 2000);
    };
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const handleChangeDate = (value) => {
        let ngayKhoiChieu = moment(value)
    }
    const render = () => {
        return (
            <>
                <Form  onSubmitCapture={formik.handleSubmit}
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
                    style={{ display: 'block', padding: '10px 0', width: '450px', height: '500px',background: '#ECF0F1',  }}
                    className="form_add"
                >
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='taiKhoan' onChange={formik.handleChange} placeholder='Nhập tài khoản' value={formik.values.taiKhoan}/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='hoTen'onChange={formik.handleChange} placeholder='Nhập họ và tên' value={formik.values.hoTen}/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='email' onChange={formik.handleChange} placeholder='Nhập email' value={formik.values.email}/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='soDt'onChange={formik.handleChange} placeholder='Nhập số điện thoại' value={formik.values.soDt}/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='matKhau' onChange={formik.handleChange} placeholder='Nhập mật khẩu' value={formik.values.matKhau}/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='maNhom' onChange={formik.handleChange} placeholder='Nhập mã nhóm' value={formik.values.maNhom}/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='maLoaiNguoiDung' onChange={formik.handleChange} placeholder='Nhập mã loại người dùng'value={formik.values.maLoaiNguoiDung} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'left', display: 'flex' }}>
                        <button style={{ padding: '10px 25px', display: 'flex', marginLeft: '160px', border: 'none', fontSize: '15px', color: '#fff', textAlign: 'left', backgroundColor: '#28a745' }} type="submit" key="submit" loading={loading} onClick={handleOk}>Cập nhật người dùng</button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    return (
        <>
            {render()}
        </>
    )
}

