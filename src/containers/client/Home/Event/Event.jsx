import React from 'react'
import './Event.css'
import img from '../../../../assets/tv.png'
import video from '../../../../assets/video-tv-0819.m4v'
import Slider from "react-slick";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="click_arrow_right">
            <i class="fas fa-chevron-right" style={{marginLeft:'15px'}}></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="click_arrow_left">
            <i class="fas fa-chevron-left"  style={{marginRight:'15px'}}></i>
        </div>
    );
}
export default function Event() {
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        // swipeToSlide: true,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                autoplay: false,
              }
            },
            {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
                  autoplay: false,
                  
                }
              }
          ]
    };
    return (
        <div>
            <div className="event_section">
                <div style={{ width: '80%', margin: '0 auto', paddingTop: '50px' }} className="event_contact">
                    <h1 className="event_label">EVENT FOR MONTH</h1>
                    <div  className="eva">
                        <div className="event_container">
                            <h1 className="event_title text-left">ENJOY YOUR LIFE</h1>
                            <h3 className="name_brand">CYBERMOVIE</h3>
                            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} className="span_event">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <div className="ml-3 pt-3">
                                    <p style={{ color: '#717171' }}> <i class="fab fa-invision" style={{ color: '#717171' }}></i>Create profiles for you</p>
                                </div>
                            </span>
                            <p className="brand_des">Save your favorites easily and always have something to watch. Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                            <p className="arrow_button">
                                <a>MORE INFO<i class="fas fa-chevron-right"></i></a>
                            </p>
                        </div>
                        <div style={{ position: 'relative', overflow: 'hidden' }} className="tv_show">
                            <img src={img} style={{ position: 'relative', zIndex: 2 }} />
                            <div className="audio_story">
                                <video autoPlay muted loop>
                                    <source type="video/mp4" src={video} />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="event_slide">
                <div style={{ width: '80%', margin: '0 auto' }}>
                    <div>
                        <h2>Swipe To Slide</h2>
                        <Slider {...settings}>
                            <div style={{ backgroundColor: 'red' }}>
                                <div style={{ color: 'white',  borderRadius: '8px' }} className="img-event">
                                    <img src='https://www.cgv.vn/media/wysiwyg/2020/122020/cgv-1k-zalopay-.png' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white',  borderRadius: '8px' }} className="img-event">
                                    <img src='https://www.cgv.vn/media/wysiwyg/2020/012020/CGV-CRM-TEAM-MEMBERSHIP-LAUNCH-350x495.jpg' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white', borderRadius: '8px' }} className="img-event">
                                    <img src='https://thegioidienanh.vn/stores/news_dataimages/thanhtan/042019/26/21/in_article/5031_Artboard_1_copy_2.jpg' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white', borderRadius: '8px' }} className="img-event">
                                    <img src='https://tse1.mm.bing.net/th?id=OIP.2AncOPb99_54qmuGoeH0ZwAAAA&pid=Api&P=0&w=300&h=300' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white', borderRadius: '8px' }} className="img-event">
                                    <img src='https://www.cgv.vn/media/wysiwyg/2021/042021/CGV-DIGITAL-HALL-RENTAL-350X495.png' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white',  borderRadius: '8px' }} className="img-event">
                                    <img src='https://www.cgv.vn/media/wysiwyg/2021/042021/CGV-DIGITAL-TEAM-CULTURE-DAY-04.2021-350x495.jpg' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white', borderRadius: '8px' }} className="img-event">
                                    <img src='https://channel.mediacdn.vn/prupload/879/2017/09/img20170921145947948.jpg' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white', borderRadius: '8px' }} className="img-event">
                                    <img src='https://tse3.mm.bing.net/th?id=OIP.0-YZY8O6emrtrm73yMR8GAHaJ4&pid=Api&P=0&w=300&h=300' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: 'white', borderRadius: '8px' }} className="img-event">
                                    <img src='https://www.cgv.vn/media/wysiwyg/2020/122020/cgv-12-12-350x495_2.jpg' style={{ height: '100%', width: '100%', borderRadius: '8px' }}></img>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
