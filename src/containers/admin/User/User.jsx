import React, { useEffect, useState, Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllMovieAdmin } from './module/action'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Modal, Button } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Tabs, Radio, Space, Table, Tag } from 'antd';
import { connect } from 'react-redux'
import { TOKEN } from '../../../setting/apiConfig';
import userApi from '../../../apis/userApi';
import AddUser from './AddUser/AddUser';
import { EDIT_USER } from './module/types';
import EditUser from './EditUser/EditUser';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
class Movie extends Component {
    state = {
        listUser: [],
        loading: false,
        visible: false,
        showPopup: false,
        isLoading: false
    };
    showModal = (id) => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleClose = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({ isLoading: false, showPopup: false });
        }, 3000);
    };

    handleCancelClose = () => {
        this.setState({ showPopup: false });
    };

    onSearch = event => {
        if (event.target.value !== '') {
            userApi.searchUser(event.target.value).then((result) => {
                this.setState({
                    ...this.state, listUser: result.data.content
                })
            }).catch(err => {
                alert('FAIL')
            })
        } else {
            userApi.layDanhSachNguoiDung(event.target.value).then((result) => {
                this.setState({
                    ...this.state, listUser: result.data.content
                })
            }).catch(err => {
                alert('FAIL')
            })
        }
    }
    columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            value: (text, object) => { return <span>{text}</span> },
            sorter: (a, b) => b.taiKhoan - a.taiKhoan,
            sortDirections: ['descend'],
            width: '15%'
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            render: (text, film) => 
                { return <span>{text}</span> },
        
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.hoTen - b.hoTen,
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email - b.email,
            width: '20%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            render: (text, film) => {
                return <span>{text}</span>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.soDt - b.soDt,
            width: '20%'
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            render: (text, film) => {
                return <span>{text}</span>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.matKhau - b.matKhau,
            width: '15%'
        },
        {
            title: 'Mã loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            render: (text, film) => {
                return <span>{text}</span>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.maLoaiNguoiDung - b.maLoaiNguoiDung,
            width: '15%'
        },
        {
            title: 'Hành động',
            width: '20%',
            render: (user) => {
                const {  editUser } = this.props;
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '20px', width:'20%' }}>
                        <i class="far fa-edit" style={{ color: 'gray' }} onClick={() => {
                            this.setState({
                                visible: true
                            });
                            editUser(user)
                        }} ></i>
                        <i class="far fa-trash-alt" style={{ color: 'red', marginLeft: '20px' }} onClick={() =>{
                             if (window.confirm(`Are you want to delete ${user.taiKhoan}?`)) {
                                userApi.xoaNguoiDung(user.taiKhoan)
                                this.componentDidMount()
                                window.location.reload()
                            }
                        }}></i>
                    </div>
                )
            }
        },
    ]
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    render() {
        const { visible, loading, idShow, showPopup, isLoading } = this.state;
        const { currentUser} = this.props
        return (
            <div style={{width:'90%', margin:'0 auto'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="relative my-5">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-coolGray-800">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                                </svg>
                            </button>
                        </span>
                        <input type="search" name="Search" placeholder="Search..." className="w-45 py-3 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-coolGray-100 text-coolGray-800 focus:bg-coolGray-50" onKeyUp={this.onSearch} suffix={suffix}/>
                    </div>
                    <div>
                    <AddUser/>
                    </div>
                </div>
                <Table columns={this.columns} dataSource={this.state.listUser} className="mt-5" />
                <Modal
                    visible={this.state.visible}
                    title="Cập nhật người dùng"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={500} footer={null}>
                       <EditUser/>
                </Modal>
                <Modal
                    visible={this.state.showPopup}
                    title="Thêm lịch chiếu"
                    onOk={this.handleClose}
                    onCancel={this.handleCancelClose}
                    width={500} footer={null}>
                </Modal>
            </div>
        )
    }
    async componentDidMount() {
        try {
            const { data } = await userApi.layDanhSachNguoiDung();
            this.setState({
                listUser: data.content
            })
        } catch (err) {
            console.log(err);
        }

    }
}
const mapStateToProps = state => {
    return {
        currentUser: state.authReducer.currentUser
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        editUser: user =>{
            dispatch({
                type:EDIT_USER,
                payload:user
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Movie)