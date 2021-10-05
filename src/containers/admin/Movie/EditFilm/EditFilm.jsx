
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
import { toast } from 'react-toastify'
import { css } from 'glamor';
import { useSelector, useDispatch } from 'react-redux';
import movieApi from '../../../../apis/movieApi';
import { actFetchAllMovieAdmin } from '../module/action';
import { actFetchDetail } from './module/action';
import { FETCH_DETAIL_PAGE_SUCCESS } from './module/types';
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
export default function EditFilm(props) {
    const { currentUser } = useSelector(state => state.authReducer)
    const { idFilm } = useSelector(state => state.MovieReducerAdmin)
    const dispatch = useDispatch()
    const [state, setState] = useState('')
    useEffect(async () => {
        movieApi.layThongTinPhim(idFilm).then((result) => {
            dispatch({
                type: FETCH_DETAIL_PAGE_SUCCESS,
                payload: result.data.content
            })
            setState({
                ...result.data.content,
                hinhAnh: null
            })
            setImg(result.data.content.hinhAnh)
            setDate(result.data.content.ngayKhoiChieu)
        })
    }, [idFilm]);
    const { thongTinPhim } = useSelector(state => state.DetailAdmin)
    const [collapsed, setCollapsed] = useState(false)
    const [imgSrc, setImgSrc] = useState(null)
    const [img, setImg] = useState(null)
    const [date, setDate] = useState(null)
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        })
    }
    const handleCancel = () => {
        setVisible(false)
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim?.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            maNhom:'GP15',
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            hot: thongTinPhim?.hot,
            sapChieu: thongTinPhim?.sapChieu,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: null
        },
        onSubmit: async (values) => {
          
            let formData = new FormData()
            for (let key in values) {
                if (key === 'hinhAnh') {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                } else {
                    if (key === 'ngayKhoiChieu') {
                        if (values.ngayKhoiChieu !== state.ngayKhoiChieu) {
                            formData.append(key, values[key])
                        } else {
                            formData.append('ngayKhoiChieu', moment(state.ngayKhoiChieu).format('DD/MM/YYYY'))
                        }
                    } else {
                        formData.append(key, values[key])
                    }
                }
                
            }
            movieApi.editFilm(formData).then(result => {
                wave()
                setTimeout(() => {
                    setLoading(false)
                    setVisible(false)
                }, 2000);
                setTimeout(() => {
                    window.location.reload()
                }, 3500);
            }).catch(err => {
                console.log(err);
                waveFail()
            })
        }
    })
    const wave = () => toast.success('Successfully Edit Movie 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const waveFail = () => toast.warning('Failed to Edit Movie 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
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
        let ngayKhoiChieu = moment(values)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu.format('DD/MM/YYYY'))
        setDate(ngayKhoiChieu)
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
    const handleImage = async (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/img') {
            await formik.setFieldValue('hinhAnh', file)
            // Reader
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
        }
    }
    const render = () => {
        return (
            <>
                <Form
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
                    onSubmitCapture={formik.handleSubmit}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    style={{ display: 'block', padding: '10px 0', width: '450px', height: '730px', background: '#ECF0F1' }}
                    className="form_add"
                >
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='tenPhim' onChange={formik.handleChange} placeholder='Tên phim' value={formik.values.tenPhim} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='trailer' onChange={formik.handleChange} placeholder='Trailer' value={formik.values.trailer} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 0 8px 10px', borderRadius: '5px' }} name='moTa' onChange={formik.handleChange} placeholder='Mô tả' value={formik.values.moTa} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px auto', width: '95%' }}>
                        <DatePicker  format="DD/MM/YYYY" onChange={handleChangeDate} style={{ width: '400px', textAlign: 'left', padding: '8px 20px 8px 10px', borderRadius: '5px' }} placeholder='Ngày khởi chiếu' value={moment(date)}/>
                    </Form.Item>
                    <Form.Item label="Đang chiếu" valuePropName="checked" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <Switch onChange={handleSwitch('dangChieu')} name="dangChieu" checked={formik.values.dangChieu} />
                    </Form.Item>
                    <Form.Item label="Sắp chiếu" valuePropName="checked" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <Switch onChange={handleSwitch('sapChieu')} name="sapChieu" checked={formik.values.sapChieu} />
                    </Form.Item>
                    <Form.Item label="Hot" valuePropName="checked" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <Switch onChange={handleSwitch('hot')} name="hot" checked={state.hot} checked={formik.values.hot} />
                    </Form.Item>
                    <Form.Item label="Đánh giá" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <InputNumber name="danhGia" onChange={handleInputNumber('danhGia')} value={formik.values.danhGia} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', marginLeft: '3%' }}>
                        <input type="file" onChange={handleImage} accept="image/img, image/jpeg, image/gif, image/png" />
                        <img width={100} height={100} src={imgSrc === null ? thongTinPhim?.hinhAnh : imgSrc} style={{ margin: '10px 0' }}></img>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'left', display: 'flex' }}>
                        <button style={{ padding: '10px 25px', display: 'flex', marginLeft: '160px', border: 'none', fontSize: '15px', color: '#fff', textAlign: 'left', backgroundColor: '#28a745' }} type="submit" key="submit" loading={loading} >Cập nhật phim</button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    return (
        <>
            {render()}
        </>
    );
}
