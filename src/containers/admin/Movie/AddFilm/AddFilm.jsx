
import React, { Component, Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment'
import { toast } from 'react-toastify'
import { css } from 'glamor';
import Calendar from 'react-calendar';
import { Tabs} from 'antd';
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
import './AddFilm.css'
import { useSelector, useDispatch } from 'react-redux';
import movieApi from '../../../../apis/movieApi';
import { actFetchAllMovieAdmin } from '../module/action';
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
export default function AddFilm(props) {
    const wave = () => toast.success('Successfully Add Movie 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const waveFail = () => toast.warning('Failed to Add Movie 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const { currentUser } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            hot: false,
            sapChieu: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            values.maNhom = 'GP15'
            let formData = new FormData();
            for (let key in values) {
                if (key === 'hinhAnh') {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                } else {
                    formData.append(key, values[key])
                }
            }
            const result = movieApi.addFilm(formData, currentUser.accessToken)
            if (result) {
                wave()
            } else {
                waveFail()
            }
        }
    })
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    }
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    const handleChangeDate = (values) => {
        let ngayKhoiChieu = moment(values).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
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
        setTimeout(() => {
            window.location.reload()
        }, 3500);
    };
    const handleCancel = () => {
        setVisible(false)
    };
    const handleImage = (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/img') {
            // Reader
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('hinhAnh', file)
        }
    }
    const render = () => {
        return (
            <>
                <Form onSubmitCapture={formik.handleSubmit}
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
                    style={{ display: 'block', padding: '10px 0', width: '450px', height: '730px',background: '#ECF0F1', }}
                   
                >
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='tenPhim' onChange={formik.handleChange} placeholder='Tên phim' className="tenPhim"/>
                    </Form.Item>
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='trailer' onChange={formik.handleChange} placeholder='Trailer' />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='moTa' onChange={formik.handleChange} placeholder='Mô tả' />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDate} style={{ width: '400px', textAlign: 'left', padding:'8px 20px 8px 10px', borderRadius:'5px' }} placeholder='Ngày khởi chiếu'/>
                    </Form.Item>
                    <Form.Item label="Đang chiếu" valuePropName="checked" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <Switch onChange={handleSwitch('dangChieu')} name="dangChieu" />
                    </Form.Item>
                    <Form.Item label="Sắp chiếu" valuePropName="checked" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <Switch onChange={handleSwitch('sapChieu')} name="sapChieu" />
                    </Form.Item>
                    <Form.Item label="Hot" valuePropName="checked" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <Switch onChange={handleSwitch('hot')} name="hot" />
                    </Form.Item>
                    <Form.Item label="Đánh giá" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <InputNumber name="danhGia" onChange={handleInputNumber('danhGia')} min={1} max={10} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <input type="file" onChange={handleImage} accept="image/img, image/jpeg, image/gif, image/png" />
                        <img width={100} height={100} src={imgSrc} style={{ margin: '10px 0' }}></img>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'left', display: 'flex' }}>
                        <button style={{ padding: '10px 25px', display: 'flex', marginLeft: '160px', border: 'none', fontSize: '15px', color: '#fff', textAlign: 'left', backgroundColor: '#28a745' }} type="submit" key="submit" loading={loading} onClick={handleOk}>Thêm phim</button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    return (
        <>
            <Button type="primary" onClick={showModal} style={{ marginBottom: '20px', height:'40px', width:'100px'}}>
                Add Film
            </Button>
            <Modal
                visible={visible}
                title="Thêm phim"
                onOk={handleOk}
                onCancel={handleCancel}
                width={500} footer={null}>
                {render()}
            </Modal>
        </>
    );
}
