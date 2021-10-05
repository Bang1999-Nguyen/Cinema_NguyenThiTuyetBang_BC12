
import React, { Suspense, lazy ,  useEffect, useState} from 'react'
import Event from './Event/Event'
import HomeCarousel from './HomeCarousel/Carousel'
import ListMovie from './ListMovie/ListMovie'
import ShowTime from './ShowTime/ShowTime'
import LazyLoad from 'react-lazyload';
export default function Home() {
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
    window.addEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <Suspense fallback={<h1 style={{ color: 'white' }}>Loading.....</h1>}>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.9)', position:'relative' }}>
        <HomeCarousel />
        <ListMovie />
        <LazyLoad height={200} once >
          <ShowTime />
        </LazyLoad>
        <Event />
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
    </Suspense>
  )
}
