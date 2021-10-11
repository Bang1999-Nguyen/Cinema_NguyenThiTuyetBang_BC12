import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actFetchAllMovie } from './module/action';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import './ListMovie.scss'
import Loader from '../../Loader/Loader';
import { SELECT_ACTION } from './module/types';
import { StyleSheet, css } from 'aphrodite';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        // <img {...props} onClick={onClick} src="./images/next-session.png" style={{marginRight:'20px'}}></img>
        <div onClick={onClick} className="click_arrow_right" >
            <i class="fas fa-chevron-right" style={{ marginLeft: '15px' }}></i>
        </div>
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        // <img {...props} onClick={onClick} src="./images/back-session.png" style={{marginRight:'20px'}}></img>
        <div onClick={onClick} className="click_arrow_left"  >
            <i class="fas fa-chevron-left" style={{ marginRight: '15px' }}></i>
        </div>
    );
}
export default function ListMovie(props) {
    const { listMovie, loading, button } = useSelector(state => state.MovieReducer)
    const [isOpen, setIsOpen] = useState({
        isOpen: false,
        trailer: ''
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchAllMovie())
    }, []);
    const showModal = (item) => {
        setIsOpen({
            isOpen: true,
            trailer: item.trailer
        })
    }
    const hideModal = () => {
        setIsOpen({
            ...isOpen,
            isOpen: false
        })
    }
    const selectAction = (item) => {
        dispatch({
            type: SELECT_ACTION,
            payload: item,
        })
    }
    const goAhead = () => {
        window.scrollTo(0, 0)
    }
    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "-4px",
        slidesToShow: 1,
        speed: 800,
        rows: 1,
        slidesPerRow: 4,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    slidesPerRow: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    slidesPerRow: 2,

                }
            }
        ]
    };

    if (loading) return <Loader />
    return listMovie && (
        <div className="container container_list" style={{ width: '87%', margin: '0 auto', backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="container button text-left my-5">
                {
                    button.map((item, index) => {
                        let active = {};
                        if (item.select) {
                            active = {
                                backgroundColor: '#fe4141',
                                color: 'white',
                                zIndex: 1
                            }
                        }
                        return (
                            <button className="btn btn-ing ml-0 mb-7 text-xl mr-8 btn-selectOption" style={active} key={index} onClick={() => selectAction(item)} >{item.name}</button>
                        )
                    })
                }
            </div>
            <Slider {...settings}>
                {
                    listMovie.map((item, index) => {
                        return (
                            <div>
                                <div style={{ width: '100%' }} className="lg_list">
                                    <div>
                                        <div className="movie-container mr-4 h-full rounded-lg overflow-hidden text-center relative mt-5" style={{ maxHeight: '460px', margin: '3px auto' }} key={index}>
                                            <div className="movie">
                                                <div className="menu"><i class="fas fa-ellipsis-h"></i></div>
                                                <div className="overlayItem" style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: '100%' }}>
                                                    <img src={item.hinhAnh} alt={item.tenPhim} className="opacity-0 w-full" />
                                                </div>
                                                <div className="text-movie-cont">
                                                    <div className="mr-grid">
                                                        <div className="col1">
                                                            <h1>{item.tenPhim}</h1>
                                                            <ul className="movie-information">
                                                                <li>PG-13 /</li>
                                                                <li>2h 49min /</li>
                                                                <li>Adventure, Drama</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="mr-grid summary-row">
                                                        <div className="col2">
                                                            <h5>SUMMARY</h5>
                                                        </div>
                                                        <div className="col2">
                                                            <ul className="movie-likes">
                                                                <li><i class="far fa-smile-wink"></i>124</li>
                                                                <li><i class="far fa-smile"></i>3</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="my-1">
                                                        <div>
                                                            <p className="movie-description">{item?.moTa.substr(0, 30)}...</p>
                                                        </div>
                                                    </div>
                                                    <div className="mr-grid action-row mt-3">
                                                        <div className="col2">
                                                            <div style={{ cursor: 'pointer', color: '#fe4141', fontWeight: '600' }} onClick={() => showModal(item)}>
                                                                <h3 className='btn-view'><i className="fas fa-play mr-1" style={{ cursor: 'pointer', color: '#fe4141' }}></i>WATCH TRAILER</h3>
                                                            </div>
                                                        </div>
                                                        <NavLink to={`/movieDetail/${item.maPhim}`} onClick={() => goAhead()}><h3 className="btn-detail" style={{ cursor: 'pointer', color: '#fe4141', fontWeight: '600' }}>VIEW DETAIL</h3></NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Mobile tablet */}
                                <div style={{ width: '100%' }} className="mobile_list lg:hidden">
                                    <div>
                                        <div className="movie-container mr-4 h-full rounded-lg overflow-hidden text-center relative mt-5" style={{ maxHeight: '235px', margin: '3px auto' }} key={index}>
                                            <div className="movie" >
                                                <div className="menu"><i class="fas fa-ellipsis-h"></i></div>
                                                <div className="overlayItem" style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundSize: 'cover', backgroundPosition: '100%' }}>
                                                    <img src={item.hinhAnh} alt={item.tenPhim} className="opacity-0 w-full" />
                                                    <img src="https://tix.vn/app/assets/img/icons/play-video.png" className="play_mobile" style={{width:'40px', height:'40px'}} onClick={() => showModal(item)}></img>
                                                </div>
                                            </div>
                                        </div>
                                        <NavLink to={`/movieDetail/${item.maPhim}`} onClick={() => goAhead()}><h3 style={{ cursor: 'pointer', color: 'white', fontWeight: '600', fontSize:'11px', maxWidth:'170px', border:'none', marginTop:'5px', borderRadius:'5px', margin:'0 auto', padding:'7px', backgroundColor:'#fe4141' }}>VIEW DETAIL</h3></NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
            {isOpen.isOpen ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl " style={{ transition: 'all 3s' }} >
                            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white " >
                                <div className="trailer-film-item">
                                    <iframe width="800" height="450" src={isOpen.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    <img src="./images/close.png" className="close" onClick={() => hideModal()}></img>
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
