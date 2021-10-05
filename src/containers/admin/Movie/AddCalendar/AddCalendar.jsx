import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Radio, Space, Table, Tag } from 'antd';
import { connect } from 'react-redux'
import { Cascader, InputNumber } from 'antd';
import { Form, Button, Select, Checkbox } from 'antd';
import { FormInstance } from 'antd/es/form';
import { DatePicker } from 'antd'
import moment from 'moment'
import { useFormik } from 'formik';
import movieApi from '../../../../apis/movieApi';
const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Search } = Input;
export default function AddCalendar(props) {
    const {  idCalendar } = useSelector(state => state.MovieReducerAdmin)
    const formik = useFormik({
        initialValues: {
            maPhim:  idCalendar,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            try {
                let result = await movieApi.addLich(values)
                alert('ADD SUCCESS')
            } catch (err) {
                alert('FAIL')
            }
        }
    })
    const [state, setState] = useState({
        heThongRap: [],
        cumRap: []
    })
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onChange = async (value) => {
        try {
            let result = await movieApi.layCumRap(value)
            setState({
                ...state,
                cumRap: result.data.content
            })
        } catch (err) {
            console.log(err);
        }
    }
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onChangeInput = (value) => {
        formik.setFieldValue('giaVe', value)
    }
    const onChangeCum = (value) => {
        //   console.log(value);
        formik.setFieldValue('maRap', value)
    }
    const [collapsed, onCollapse] = useState(false)
    useEffect(async () => {
        try {
            let result = await movieApi.layHeThongRap()
            setState({
                ...state,
                heThongRap: result.data.content,
            })
        } catch (err) {
            console.log(err);
        }

    }, [])
    return (

        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onSubmitCapture={formik.handleSubmit}
        >
            <Form.Item
                label="Hệ thống rạp"

            >
                <Select options={
                    state.heThongRap.map((htr, index) => {
                        return (
                            { label: htr.tenHeThongRap, value: htr.maHeThongRap }
                        )
                    })
                } onChange={onChange} placeholder="Chọn hệ thống rạp" style={{ maxWidth: '300px', width: '300px' }} />
            </Form.Item>
            <Form.Item
                label="Cụm rạp"

            >
                <Select options={
                    state.cumRap?.map((cum, index) => {
                        return (
                            { label: cum.tenCumRap, value: cum.maCumRap }
                        )
                    })
                } onChange={onChangeCum} placeholder="Chọn cụm rạp" style={{ maxWidth: '300px', width: '300px' }} />
            </Form.Item>
            <Form.Item
                label="Ngày chiếu"

            >
                <DatePicker showTime onChange={onChange} onOk={onOk} format="DD/MM/YYYY hh:mm:ss" />
            </Form.Item>
            <Form.Item
                label="Gía vé"

            >
                <InputNumber min={75000} max={150000} onChange={onChangeInput} />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 10,
                    span: 25,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Tạo lịch chiếu
                </Button>
            </Form.Item>
        </Form>

    )
}

