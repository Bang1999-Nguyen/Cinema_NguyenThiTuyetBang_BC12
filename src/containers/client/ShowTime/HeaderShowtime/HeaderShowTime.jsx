import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import './HeaderShowtime.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { useHistory, NavLink } from "react-router-dom";
import moment from 'moment'
import { actLogout } from '../../../shared/LogIn/module/action';
import ContentShowtime from '../ContentShowtime/ContentShowtime';
import { FETCH_HISTORY_SUCCESS, LOG_OUT, TAB_ACTIVE } from './module/types';
import { actFetchHistoryBooking, actTabActive, LogOut } from './module/action';
import { TOKEN, USER_LOGIN } from '../../../../setting/apiConfig';
import movieApi from '../../../../apis/movieApi';
import callApiUser from '../../../../utils/callApiUser';
import Paginate from './Paginate';
import CountTime from '../CountTime/CountTime';
const { TabPane } = Tabs;

export default function HeaderShowTime(props) {
    const { currentUser } = useSelector(state => state.authReducer)
    const [showModal, setShowModal] = useState(false);
    const { tabActive } = useSelector(state => state.UserAction)
    const { listHistoryBooking, loading, error } = useSelector(state => state.HistoryBooking)
    const history = useHistory();
    const { Id } = props
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(actFetchHistoryBooking())
    }, [tabActive]);
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    // get current posts
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
    const renderAccount = () => {
        if (!_.isEmpty(currentUser)) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} className="name_book">
                <div className="circle" style={{ backgroundColor: '#6a1b9a', borderRadius: '50%', }} className="name">{currentUser.taiKhoan.substr(0, 1)}</div>
                <h3 style={{ color: '#ffff', marginLeft: '10px', fontSize: '15px' }}>
                    Hello ! {currentUser.taiKhoan}
                </h3>

                <button style={{ color: '#fff', marginLeft: '30px', border: 'none', background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)", borderRadius: '20px' }} onClick={() => {
                    setShowModal(true)
                }} className="logout_btn">Log out</button>
            </div>
        } else {
            return <button style={{ color: '#fff', marginLeft: '30px', marginTop: '-6px', border: 'none', padding: '8px 28px', fontSize: '16px', background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)", borderRadius: '20px' }} onClick={() => {
                setShowModal(true)
            }}>Log Out</button>
        }
    }
    const LogOut = () => {
        setShowModal(false)
        dispatch({
            type: LOG_OUT,
            payload: null
        })
        setTimeout(() => {
            history.push("/");
        }, 1800)
    }
    return (
        <div style={{backgroundColor: '#211d2c', position: 'relative', paddingTop: '30px', width: '100%' }} className="showtime_cinema">
            <div >
                <div className="tab-book px-5">
                    <Tabs defaultActiveKey={'1'} activeKey={tabActive} style={{ paddingleft: '40px' }} onChange={(key) => dispatch(actTabActive(key.toString()))}>
                        <TabPane tab={`CHỌN GHẾ VÀ THANH TOÁN`} key="1" style={{ marginTop: '50px'}}>
                            <ContentShowtime Id={Id} />
                        </TabPane>
                        <TabPane tab={`KẾT QUẢ ĐẶT VÉ`} key="2">
                            <section className="text-gray-600 body-font" className="section_person">
                                <div className="container px-5 py-24 mx-auto">
                                    <div className="flex flex-col text-center w-full mb-20">
                                        <h2 className="text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">YOUR BOOKING</h2>
                                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-white mt-4">THANK YOU FOR YOUR PURCHASE!</h1>
                                    </div>
                                    <div className="flex flex-wrap -m-4">
                                        {
                                            currentPosts?.map((ticket, index) => {
                                                const seats = _.first(ticket.danhSachGhe)
                                                return listHistoryBooking && (
                                                    <div className="p-4 lg:w-1/3 sm:w-1/2">
                                                        <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                                            <div className="flex items-center mb-3">

                                                                <img alt="content" className="object-cover object-center h-full w-full" src={ticket.hinhAnh} style={{ width: '80px', height: '80px', borderRadius: '50%' }} onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                                                                }} />

                                                                <h2 className="text-gray-900 text-lg title-font font-medium ml-5">{ticket.tenPhim}</h2>
                                                            </div>
                                                            <div className="flex-grow" className="infor_result">
                                                                <p className="leading-relaxed text-base text-left my-4">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY')}</p>
                                                                <p className="leading-relaxed text-base text-left my-3 place" >Địa điểm: {seats.tenHeThongRap} </p>
                                                                <p className="leading-relaxed text-base text-left my-5">
                                                                    Rạp: {seats.tenCumRap}  - Ghế:{ticket.danhSachGhe.map((ghe, index) => { return <span > {ghe.tenGhe} </span> })}
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
                                </div>
                            </section>
                        </TabPane>
                    </Tabs>
                    <div>
                        <NavLink to="/" className="goBack">
                            <i class="fas fa-home"></i>
                        </NavLink>
                    </div>
                    <div  className="count">
                    <h1 >
                        <CountTime />
                    </h1>
                    </div>
                    <div style={{ fontSize: '23px', position: 'absolute', top: '16px', right: '30px', color: '#fff' }}>
                        {renderAccount()}
                    </div>
                </div>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl " style={{ transition: 'all 3s' }} >
                            <div className="trailer-film-item">
                                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white " >
                                    <div className>
                                        <div className="text-center p-5 flex-auto justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                                            <p className="text-sm text-gray-500 px-8">Do you really want to log out your account?
                                                This process cannot be undone</p>
                                        </div>
                                        <div className="p-3  mt-2 text-center space-x-4 md:block">
                                            <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setShowModal(false)}>
                                                Cancel
                                            </button>
                                            <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600" onClick={() => LogOut()}>Log Out</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}
