import React, { Component } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import './ShowTime.css'
export default class Movie extends Component {
  click() {
    window.scrollTo(0, 0)
  }
  render() {
    const { listFilm, posts } = this.props;
    return (
      <div>
        {
         posts?.map((item, index) => {
            return (
              <div className="showTime" style={{ borderBottom: '1px solid #d8d8d8', padding: '30px 0', display: 'flex', alignItems: 'center', marginTop: '0%'}} key={index}>
                <div style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="showtime_bg">
                  <img src={item.hinhAnh} style={{ opacity: 0 }}></img>
                </div>
                <div style={{paddingLeft: '30px', textAlign: 'left' }} className="infor_movie">
                  <span className="my-2 title-film">ACTION, ADVENTURE, FANTASY</span>
                  <h3 style={{fontWeight: '400', letterSpacing: '1px', color: '#101010' }} className="my-2">{item.tenPhim}</h3>
                  <p className="my-3" >{listFilm.diaChi}</p>
                  <div className="ml-3 my-2" className="clock_time">
                    <i class="far fa-clock"></i>
                    <span className="pl-2" style={{ letterSpacing: '1.5px', color: '#4a4a4a' }}>VIEWING TIMES</span>
                  </div>
                  <div className="mt-4 md:col-span-6 grid grid-cols-7 gap-1">
                    {
                      item.lstLichChieuTheoPhim?.slice(0, 14).map((lichChieu, index) => {
                        return <NavLink to={`/checkOut/${lichChieu.maLichChieu}`} className="time-list" onClick={() => this.click()}  key={index} >
                          {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                        </NavLink>
                      })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}




