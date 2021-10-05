import React, { useEffect, useState } from 'react'
import { Modal, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllMovie, actFetchComment, actFetchCommentMovie } from './module/action';
import './MovieDetail.css'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { Tabs, Radio, Space } from 'antd';
import { Rate } from 'antd';
import { TRANSFER_PAGE } from './module/types';
import movieApi from '../../../apis/movieApi';
const { TabPane } = Tabs;
export default function MovieDetail(props) {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.authReducer)
    const { movieId } = props.match.params
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [state, setState] = useState(2);
    const [evaluate, setEvaluation] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.pageYOffset > 1200) {
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
    useEffect(() => {
        dispatch(actFetchAllMovie(movieId))
        dispatch(actFetchCommentMovie())
        window.addEventListener("scroll", toggleVisibility);
    }, []);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleChange = value => {
        setState(value);
    };
    const handleChangeEve = (event) => {
        setEvaluation(event.target.value)
    }
    const evaluation = () => {
        const feedback = {
            taiKhoan: currentUser.taiKhoan,
            danhGia: state,
            binhLuan: evaluate,
            hinhAnh: 'https://source.unsplash.com/100x100/?portrait',
        }
        movieApi.addComment(feedback)
        setTimeout(() => {
            setIsModalVisible(false);
            dispatch(actFetchCommentMovie())
        }, 3000)
    }
    const { listMovieDetail, loading, listComment } = useSelector(state => state.DetailMovieReducer)
    if (loading) return <div style={{ height: '50vh', backgroundColor: 'white', width: '100%' }}>
        <div className="loader" style={{ paddingTop: '10%', margin: '0 45%' }}>
            <img src="https://gifimage.net/wp-content/uploads/2018/11/transparent-loading-gif-free-4.gif" style={{ width: '120px', height: '120px' }}></img>
        </div>
    </div>
    const score = (listMovieDetail?.danhGia / 2)
    return listMovieDetail && (
        <div style={{ width: '100%', maxWidth: '100%', scrollMarginBottom: '0', position: 'relative' }} className="bg_detail_cinema">
            <div className="content_hero" style={{ backgroundImage: `url(${listMovieDetail?.hinhAnh})`, height: '500px', paddingTop: '50px', backgroundSize: 'cover', backgroundPosition: '100%', backgroundRepeat: 'no-repeat', position: 'relative', backgroundColor: 'black', width: '100%', maxWidth: '100%' }} >
                <div className="icon-play">
                    <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt="" />
                </div>
            </div>
            <div className="bg-detail">
                <div className="container-show">
                    <div className="banner-name">
                        <div className="banner-content">
                            <h1 style={{ textAlign: 'left', fontWeight: 'bold' }}>ARE YOU READY TO BOOK TICKET?</h1>
                            <h1 style={{ color: 'white', textAlign: 'left', textTransform: 'uppercase', fontWeight: 'bold', maxWidth: '500px' }} className="detail_title_movie">{listMovieDetail?.tenPhim}</h1>
                            <p className="time_detail">Ngày khởi chiếu: {moment(listMovieDetail?.ngayKhoiChieu).format('DD.MM.YYYY')} </p>
                            <div className="rate_page">
                                <span>
                                    <div className="single-chart">
                                        <svg viewBox="0 0 36 36" className="circular-chart blue">
                                            <path className="circle-bg"
                                                d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path className="circle"
                                                stroke-dasharray={`${listMovieDetail?.danhGia * 10}`, 100}
                                                d="M18 2.0845
                                 a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <text x="18" y="20.35" className="percentage">{listMovieDetail?.danhGia * 10}%</text>
                                        </svg>
                                    </div>
                                    <div className="eval pl-5">
                                        <h3 style={{ color: '#fff', textAlign: 'left', fontWeight: 'bold' }} className="danhGia_phim">EVALUATION</h3>
                                        <h3 className="score_star"><Rate allowHalf defaultValue={score} /></h3>
                                    </div>
                                </span>
                                <p className="w-trailer mt-9"><a style={{ color: 'white', fontWeight: 'bold', letterSpacing: '0.05em', }} className="watch_detail"><i class="fas fa-play"></i>WATCH TRAILER</a></p>
                            </div>
                        </div>
                        <div className="banner-img mt-20">
                            <div className="content-main mt-20">
                                <div className="overlayDetail">
                                    <img src={listMovieDetail?.hinhAnh} alt="" className="opacity-1 w-full h-full" onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                                    }
                                    } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ margin: '40% auto', backgroundColor: 'white', borderRadius: '10px', height: '930px', maxHeight: '930px', border: 'none', overflowY: 'scroll' }} className="box_movie">
                    <Tabs tabPosition='top' >
                        {
                            listMovieDetail.heThongRapChieu?.map((item, index) => {
                                return (
                                    <TabPane tab={<div className="text-center name-rap" style={{ marginRight: '18px' }} >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="img_detail_movie">
                                            <img src={item.logo}></img>
                                            <p className="mt-2 text-center">{item.tenHeThongRap}</p>
                                        </div>
                                    </div>} key={index}>
                                        {
                                            item.cumRapChieu?.map((rap, index) => {
                                                return (
                                                    <div style={{ width: '100%', borderBottom: '1px solid #d8d8d8', display: 'flex' }} className="chiTiet">
                                                        <div style={{ width: '20%', backgroundImage: `url(${rap.hinhAnh})`, borderRadius: '10px' }} className="img_cinema">
                                                        </div>
                                                        <div className="content-cinema" >
                                                            <h3 style={{ letterSpacing: '1px', fontWeight: '300' }} className="my-3">{rap.tenCumRap}</h3>
                                                            <h3 style={{ color: '#717171', letterSpacing: '0.5px', padding: '3px 0' }} className="addr">{rap.diaChi}</h3>
                                                            <div className="my-2">
                                                                <span style={{ color: '#ec7532' }}><i class="far fa-clock" style={{ color: '#ec7532', marginRight: '10px' }}></i>VIEWING TIMES</span>
                                                            </div>
                                                            <div className="grid grid-cols-6 gap-3 my-1">
                                                                {
                                                                    rap.lichChieuPhim?.slice(0, 12).map((lich, index) => {
                                                                        return (
                                                                            <NavLink
                                                                                to={`/checkOut/${lich.maLichChieu}`} onClick={() => {
                                                                                    window.scrollTo(0, 0)
                                                                                    dispatch({
                                                                                        type: TRANSFER_PAGE
                                                                                    })
                                                                                }} className="btn_detail">
                                                                                {moment(lich.ngayChieuGioChieu).format('hh:mm A')}
                                                                            </NavLink>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </div>
            <div style={{ width: '100%', borderBottom: '0.5px solid #d8d8d8', backgroundColor: 'white', marginTop: "20px" }} className="comment">
                <div style={{ width: '80%', margin: '0 auto', position: 'relative', padding: '70px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '70%', backgroundColor: 'transparent', height: '600px', lineHeight: '700px', maxHeight: '600px', overflowY: 'scroll' }}>
                        <div>
                            <h2 className="md:text-sm lg:text-lg font-semibold text-left ">COMMENTS</h2>
                            <ul className="flex flex-col divide-y divide-coolGray-300" style={{ padding: '0 20px' }}>
                                {
                                    listComment?.map((item, index) => {
                                        return (
                                            <li className="flex flex-col py-5 sm:flex-row sm:justify-between" key={index}>
                                                <div className="flex w-full space-x-2 sm:space-x-4">
                                                    <img src={item.hinhAnh} alt="" className="object-cover w-24 h-24 rounded-full bg-coolGray-500" />
                                                    <div className="flex flex-col justify-between w-full pb-4">
                                                        <div className="flex justify-between w-full pb-2 space-x-2">
                                                            <div className="space-y-1">
                                                                <h3 className=" font-semibold leading-snug text-left md:text-sm lg:text-lg">{item.taiKhoan}</h3>
                                                                <p className="text-sm md:text-xs lg:text-sm text-coolGray-600 text-left">{item.binhLuan}</p>
                                                            </div>
                                                            {/* <div className="text-right">
                                                                <p className="text-lg font-semibold">59.99€</p>
                                                                <p className="text-sm line-through text-coolGray-400">75.50€</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="flex text-sm divide-x">
                                                            <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fillCurrent">
                                                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                                    <rect width="32" height="200" x="168" y="216"></rect>
                                                                    <rect width="32" height="200" x="240" y="216"></rect>
                                                                    <rect width="32" height="200" x="312" y="216"></rect>
                                                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                                </svg>
                                                                <span onClick={() => {
                                                                    movieApi.deleteComment(item.id).then(() => {
                                                                        dispatch(actFetchCommentMovie())
                                                                    })
                                                                }} style={{ fontSize: '13px' }} className="remove">Remove</span>
                                                            </button>
                                                            <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fillCurrent">
                                                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                                                </svg>
                                                                <span style={{ fontSize: '13px' }} className="remove">Add to favorites</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div style={{ width: '30%' }}>
                        <button style={{ background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)", color: 'white', fontWeight: '600', letterSpacing: '1px', padding: '12px 20px', borderRadius: '5px' }} onClick={showModal} className="leave_comment">LEAVE A COMMENT</button>
                        <Modal title="" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false} footer={null}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '400px' }}>
                                <h2 className="text-gray-800 text-xl font-semibold text-center">Your opinion matters to us!</h2>
                                <span className="mx-auto my-3">
                                    <Rate onChange={handleChange} value={state} />
                                </span>
                                <div className="w-3/4 flex flex-col">
                                    <textarea rows="3" className="p-4 text-gray-500 rounded-xl resize-none" style={{ border: '0.3px solid #EEE5DE', outline: 'none' }} onChange={handleChangeEve}>Leave a message, if you want</textarea >
                                    <button className="py-3 my-5 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white" onClick={() => evaluation()}>Rate now</button>
                                    <button className="py-3 my-3 text-lg bg-purple-200 rounded-xl text-gray-800 border-gray-700" onClick={handleCancel}>May be later</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
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
    )
}
