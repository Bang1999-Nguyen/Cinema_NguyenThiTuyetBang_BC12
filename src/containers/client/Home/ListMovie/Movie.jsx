import React, { Component } from 'react'
import Slider from "react-slick";
import moment from 'moment'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


export default class Movie extends Component {
  click() {
    window.scrollTo(0,0)
  }
  render() {
    const { posts, listFilm } = this.props;
    return (
      <main className="main">
        {
        posts?.map((item, index) => {
            return (
              <div className="movie-list">
                <img src={item.hinhAnh} alt="" style={{ width: '300px' }} onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                }} />
                <div className="movie-info">
                  <h3 style={{ color: '#fff',textAlign:'left'}}>{item.tenPhim.length > 50 ? item.tenPhim.substr(0,30) : item.tenPhim}</h3>
                  <span className="green">9.8</span>
                </div>
                <div className="overview">
                  <h3>Showtime</h3>
                  <p className="text-black">{listFilm.diaChi}</p>
                  <div className="grid grid-cols-3 gap-3 ">
                    {
                      item.lstLichChieuTheoPhim?.slice(0, 6).map((lichChieu, index) => {
                        return <NavLink to={`/CheckOut/${lichChieu.maLichChieu}`} className="time-list" onClick={() => this.click()}>
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
      </main>
    )
  }
}




