import React, {  useEffect, useState } from 'react'
import { Carousel } from 'antd';
import './Carousel.scss'
import { useSelector, useDispatch } from 'react-redux'
import { actFetchCarousel } from './module/action';
import Loader from '../../Loader/Loader';
export default function HomeCarousel(props) {
    const { listCarousel, loading } = useSelector(state => state.CarouselReducer)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchCarousel())
    }, []);
    const renderImg = () => {
        return listCarousel.map((item, index) => {
            return (
                <div>
                    <div className="movie_card" id="right" key={index}>
                        <div className="blur_back " style={{ backgroundImage: `url(${item.hinhAnh})` }}>
                            <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} />
                        </div>
                        <div className="overlay">
                            <div className="content_carousel">
                                <h2>{item.tenPhim}</h2>
                                <span className="detail my-3">
                                    <p>{item.loaiPhim} / </p>
                                    <p>{item.tenDienVien}</p>
                                </span>
                                <p className="movie-detail" style={{margin:'5px 0 10px 0'}}>
                                    {item.moTa}
                                </p>
                                <a  className="play" >
                                    <img src="https://tix.vn/app/assets/img/icons/play-video.png" alt="" onClick={() => {
                                        setIsOpen(true)
                                    }}/>
                                    <span>Watch Trailer</span>
                                </a>
                            </div>
                        </div>
                        <div className="slide" style={{ background: `url(${item.img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        </div>
                        <ul className="movie-contact">
                            <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                        </ul>
                    </div>
                    <div className="backgroundLinear"></div>
                    {isOpen ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50!important outline-none focus:outline-none "
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl " style={{ transition: 'all 3s'}} >
                                    <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white " >
                                        <div className="trailer-film-item">
                                            <iframe width="800" height="450" src={`https://www.youtube.com/embed/bKL1ImsN-DU`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            <img src="./images/close.png" className="close" onClick={() => setIsOpen(false)}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </div>
            )
        })
    }
    if(loading) return <Loader/>
    return listCarousel && (
        <Carousel effect="fade" autoplay>
            {renderImg()}
        </Carousel>
    )
}


