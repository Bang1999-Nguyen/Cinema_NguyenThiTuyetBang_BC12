import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchHistoryBooking, actFetchHistoryProfile } from '../ShowTime/HeaderShowtime/module/action'
import Paginate from '../ShowTime/HeaderShowtime/Paginate'
import { Link, Redirect } from 'react-router-dom';
import './Profile.css'
import { Modal, Button } from 'antd';
import _ from 'lodash'
import moment from 'moment'
import { useFormik } from 'formik';
import { toast } from 'react-toastify'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { css } from 'glamor';
import {
    Form,
    Input,
} from 'antd';
import './Profile.css'
import { TOKEN, USER_LOGIN } from '../../../setting/apiConfig';
import { actFetchInformation } from './module/action';
import userApi from '../../../apis/userApi';
import { FETCH_HISTORY_SUCCESS } from '../ShowTime/HeaderShowtime/module/types';
import callApiUser from '../../../utils/callApiUser';
import { SET_LOCAL } from '../../shared/LogIn/module/types';
toast.configure({
    toastClassName: css({
        fontSize: '18px !important',
        backgroundColor: 'red!important',
        padding: '18px !important'
    }),
});
export default function Profile(props) {
    const wave = () => toast.success('Successfully Updated Information 👋', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    const dispatch = useDispatch()
    const { currentUser } = useSelector(
        state => state.authReducer
    );
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      if (window.pageYOffset > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    const { Information } = useSelector(state => state.Information)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: Information[0]?.taiKhoan,
            hoTen: Information[0]?.hoTen,
            email: Information[0]?.email,
            soDt: Information[0]?.soDt,
            matKhau: Information[0]?.matKhau,
            maNhom: currentUser?.maNhom,
            maLoaiNguoiDung: Information[0]?.maLoaiNguoiDung
        },
        onSubmit: (values) => {
            userApi.updateUser(values).then(res => {
                setTimeout(() => {
                    dispatch(actFetchHistoryProfile())
                    dispatch({
                        type: SET_LOCAL,
                        payload: values
                    })
                    setIsModalVisible(false);
                    setTimeout(() => {
                        wave()
                    }, 1500)
                }, 800)

            })
        }
    })
    const { listHistoryBooking, loading, error } = useSelector(state => state.HistoryBooking)
    useEffect(() => {
        dispatch(actFetchHistoryBooking())
        dispatch(actFetchInformation(currentUser.maNhom, currentUser.taiKhoan))
        window.addEventListener("scroll", toggleVisibility);
    }, [])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setTimeout(() => {
            setIsModalVisible(false);
        }, 2000)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [isView, setIsView] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)
    const user = localStorage.getItem(USER_LOGIN)
    const token = localStorage.getItem(TOKEN)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listHistoryBooking.thongTinDatVe?.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const nextPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const prevPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const handleOnChange = (event) => {
        const { name, value } = event.target;
    }
    const [isModalVisibleModal, setIsModalVisibleModal] = useState(false);
    const showModalProfile = () => {
        setIsModalVisibleModal(true);
    };
    const handleOkProfile = () => {
        setIsModalVisibleModal(false);
    };
    const handleCancelProfile = () => {
        setIsModalVisibleModal(false);
    };
    if (loading) return <div style={{ height: '50vh', backgroundColor: 'white', width: '100%' }}>
        <div className="loader" style={{ paddingTop: '6%', margin: '0 45%' }}>
            <img src="https://media.giphy.com/media/YMM6g7x45coCKdrDoj/giphy.gif" style={{ width: '100%', height: '180px' }}></img>
        </div>
    </div>
    return user ? listHistoryBooking && (
        <div style={{ paddingTop: '0%',  backgroundColor: 'white', position:'relative' }} className="profile_modal">
            <div style={{ height: '400px', width: '100%', backgroundImage: 'url("./images/hero-contact.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }} className="profile_page">
                <div className="profile_header">
                    <div >
                        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-coolGray-50 text-coolGray-800 infor_profile">
                            <img src="https://source.unsplash.com/150x150/?portrait" alt="" className="w-32 h-32 mx-auto rounded-full bg-coolGray-500" />
                            <div className="space-y-4 text-center divide-y divide-coolGray-300">
                                <div className="my-2 space-y-1 ">
                                    <h2 className="text-xl font-semibold sm:text-2xl text-center ">{listHistoryBooking.taiKhoan}</h2>
                                    <p className="px-1 text-xs sm:text-base text-coolGray-600 ml-2">{listHistoryBooking.hoTen}</p>
                                    <p className="px-5 text-xs sm:text-base text-coolGray-600">{listHistoryBooking.email}</p>
                                </div>
                                <div className="flex justify-center pt-2 space-x-4 align-center">
                                    <a href="#" aria-label="GitHub" className="p-2 rounded-md text-coolGray-800 hover:text-violet-600">
                                        <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fillCurrent">
                                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                                        </svg>
                                    </a>
                                    <a href="#" aria-label="Dribble" className="p-2 rounded-md text-coolGray-800 hover:text-violet-600">
                                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fillCurrent">
                                            <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path>
                                        </svg>
                                    </a>
                                    <a href="#" aria-label="Twitter" className="p-2 rounded-md text-coolGray-800 hover:text-violet-600">
                                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fillCurrent">
                                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                        </svg>
                                    </a>
                                    <a href="#" aria-label="Email" className="p-2 rounded-md text-coolGray-800 hover:text-violet-600">
                                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fillCurrent">
                                            <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {listHistoryBooking.thongTinDatVe?.length !== 0 ? <div className="profile_content">
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="btn_profile">
                        <button style={{ margin: '17px 0', padding: '15px 25px', background: 'linear-gradient(80deg, #CC3366 0%, #663366 100%)', color: 'white', fontWeight: '600', borderRadius: '4px' }}>HISTORY BOOKING</button>
                        <button style={{ margin: '17px 0', padding: '15px 25px', background: '#CFCFCF', color: 'black', fontWeight: '600', borderRadius: '4px', marginLeft: '20px' }} className="shadow-inner" onClick={showModal}>VIEW INFORMATION</button>
                    </div>
                    <div className="mt-4" >
                        {
                            currentPosts?.map((ve, index) => {
                                const seats = _.first(ve.danhSachGhe)
                                return (
                                    <div className=" p-8 sm:flex sm:space-x-6  text-coolGray-800 shadow-2xl bg-coolGray-50 box-profile"  >
                                        <div className="flex-shrink-0 w-full mb-6 h-45 sm:h-40 sm:w-32 sm:mb-0 img-profile" key={index}>
                                            <img src={ve.hinhAnh} alt="" className="object-cover object-center w-full h-full rounded bg-coolGray-500" />
                                        </div>
                                        <div className="flex flex-col space-y-4">
                                            <div>
                                                <h2 className="text-2xl font-semibold text-left">{ve.tenPhim}</h2>
                                                <p className="text-sm text-left">{ve.ngayDatVe}</p>
                                                <p className="leading-relaxed text-base text-left">Giờ chiếu: {moment(ve.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(ve.ngayDat).format('DD-MM-YYYY')}</p>
                                                <p className="my-3 text-base text-left">Địa điểm: {seats.tenHeThongRap} </p>
                                                <p className="my-3 text-base text-left">
                                                    Rạp: {seats.tenCumRap} - Ghế:{ve.danhSachGhe.map((ghe, index) => { return <span> {ghe.tenGhe} </span> })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <Paginate postsPerPage={postsPerPage} totalPosts={listHistoryBooking?.thongTinDatVe?.length} style={{ marginTop: '30px' }} paginate={paginate} pageNumber={currentPage} nextPage={nextPage} prevPage={prevPage} />
                    </div>
                </div> : <div style={{ paddingTop: '6%', margin: '0 auto', width: '50%' }} className="history_booking">
                    <svg xmlns="http://www.w3.org/2000/svg">
                        <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                            <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
                        </filter>
                    </svg>
                    <span filter-content="S">Let's Book Tickets!</span>
                    <img src="./images/cherry-horror-film.png" style={{ width: '90%', height: '90%' }}></img>
                </div>}
            </div>
            <Modal title="Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    onSubmitCapture={formik.handleSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    layout="horizontal"
                    style={{ display: 'block', padding: '10px 0', width: '450px', height: '400px', background: '#ECF0F1', }}
                    className="form_add"
                >
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 10px 8px 10px', borderRadius: '5px' }} name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 10px 8px 10px', borderRadius: '5px' }} name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 10xp 8px 10px', borderRadius: '5px' }} name='email' onChange={formik.handleChange} value={formik.values.email} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input style={{ width: '400px', textAlign: 'left', padding: '8px 10px 8px 10px', borderRadius: '5px' }} name='soDt' onChange={formik.handleChange} placeholder='Nhập số điện thoại' value={formik.values.soDt} />
                    </Form.Item>
                    <Form.Item style={{ margin: '13px 5%', width: '100%' }}>
                        <Input.Password
                            placeholder="input password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={formik.values.matKhau} name='matKhau' onChange={formik.handleChange} style={{ width: '400px', textAlign: 'left', padding: '8px 10px 8px 10px', borderRadius: '5px', position:'relative' }} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'left', display: 'flex' }}>
                        <button style={{ padding: '10px 25px', display: 'flex', marginLeft: '140px', border: 'none', fontSize: '15px', color: '#fff', textAlign: 'left', background: 'linear-gradient(80deg, #CC3366 0%, #663366 100%)' }} type="submit" key="submit" loading={loading} >Cập nhật thông tin</button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Basic Modal" visible={isModalVisibleModal} onOk={handleOkProfile} onCancel={handleCancelProfile} style={{ marginTop: '5%' }} title={null} footer={null} closable={false}>
            </Modal>
            {isVisible &&
            <div onClick={scrollToTop}>
              <div className="arrow-container animated fadeInDown" style={{ position: 'fixed', top: '40%', right: '2%' }}>
                <div className="arrow_up">
                  <i className="fas fa-chevron-up" />
                </div>
                <div className="arrow-1 animated hinge infinite zoomIn" />
              </div>
            </div>}
        </div>
    ) : (
        <Redirect to="/" />
    );
}
