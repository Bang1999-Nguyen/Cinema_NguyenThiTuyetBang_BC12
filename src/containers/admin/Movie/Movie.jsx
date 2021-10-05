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
import movieApi from '../../../apis/movieApi';
import AddFilm from './AddFilm/AddFilm';
import { connect } from 'react-redux'
import './Movie.css'
import { TOKEN } from '../../../setting/apiConfig';
import EditFilm from './EditFilm/EditFilm';
import { IS_LOADING } from '../../client/ShowTime/ContentShowtime/module/types';
import AddCalendar from './AddCalendar/AddCalendar';
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
        listFilm: [],
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
            movieApi.searchFilm(event.target.value).then((result) => {
                this.setState({
                    ...this.state, listFilm: result.data.content
                })
            }).catch(err => {
                alert('FAIL')
            })
        } else {
            movieApi.fetchAllMovie(event.target.value).then((result) => {
                this.setState({
                    ...this.state, listFilm: result.data.content
                })
            }).catch(err => {
                alert('FAIL')
            })
        }
    }
    columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            value: (text, object) => { return <span>{text}</span> },
            sorter: (a, b) => b.maPhim - a.maPhim,
            sortDirections: ['descend'],
            width: '15%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <div>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={40} height={40} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                    }
                    } style={{ borderRadius: '10%' }} />
                </div>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            width: '15%'
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.tenPhim - b.tenPhim,
            width: '20%'
        },
        {
            title: 'Mô Tả Phim',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <p>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa},
                </p>
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.moTa - b.moTa,
            width: '30%'
        },
        {
            title: 'Hành động',
            width: '20%',
            render: (film) => {
                const { deleteFilm, isShow, isCalendar } = this.props;
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '20px' }}>
                        <i class="far fa-edit" style={{ color: 'gray' }} onClick={() => {
                            this.setState({
                                visible: true
                            });
                            isShow(film.maPhim)
                        }} ></i>
                        <i class="far fa-trash-alt" style={{ color: 'red', marginLeft: '20px' }} onClick={() => {
                            if (window.confirm(`Are you want to delete ${film.tenPhim}?`)) {
                                movieApi.deleteFilm(film.maPhim).then(result =>{
                                    this.componentDidMount()
                                    window.location.reload()
                                })
                            }
                        }}></i>
                        <i class="far fa-plus-square" style={{ color: 'blue', marginLeft: '20px' }} onClick={() => {
                            this.setState({
                                showPopup: true
                            });
                            isCalendar(film.maPhim)
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
        const { currentUser, } = this.props
        return (
            <div style={{ width: '90%', margin: '0 auto' }}>
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
                        <AddFilm />
                       
                    </div>
                </div>
                <Table columns={this.columns} dataSource={this.state.listFilm} className="mt-2" />
                <Modal
                    visible={this.state.visible}
                    title="Chỉnh sửa phim"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={500} footer={null}>
                    <EditFilm id={idShow} />
                </Modal>
                <Modal
                    visible={this.state.showPopup}
                    title="Thêm lịch chiếu"
                    onOk={this.handleClose}
                    onCancel={this.handleCancelClose}
                    width={500} footer={null}>
                    <AddCalendar />
                </Modal>
            </div>
        )
    }
    async componentDidMount() {
        try {
            const { data } = await movieApi.fetchAllMovie();
            this.setState({
                listFilm: data.content
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
const mapDispatchToProps = dispatch => {
    return {
        isShow: id => {
            dispatch({
                type: 'IS_SHOW',
                payload: id
            })
        },
        isCalendar: id => {
            dispatch({
                type: 'IS_CALENDAR',
                payload: id
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Movie)


