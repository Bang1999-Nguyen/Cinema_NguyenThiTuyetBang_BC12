import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchShowtime, actFetchShowtimeReload, actFinish, actHideLoading, actLoading, actTransferTab, isLoading } from './module/action';
import './ContentShowtime.css'
import { Fragment } from 'react';
import { BOOK_TICKET } from './module/types';
import _ from 'lodash'
import { TOKEN, USER_LOGIN } from '../../../../setting/apiConfig';
import { ThongTinDatVe } from '../../../../core/ThongTinDatVe';
import movieApi from '../../../../apis/movieApi';
import { Modal, Button, Space } from 'antd';
import { toast } from 'react-toastify'
const { confirm } = Modal;
toast.configure();
export default function ContentShowtime(props) {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.UserAction)
    const { Id } = props;
    const waveSuccess = () => toast.success('Booking tickets successfully👋', { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
    useEffect(() => {
        dispatch(actFetchShowtime(Id))
    }, []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
        
    };
    const handleYes = () => {
            setIsModalVisible(false)
        const thongTinDatVe = new ThongTinDatVe();
        thongTinDatVe.maLichChieu = Id;
        thongTinDatVe.danhSachVe = danhSachGheDangDat;
        dispatch(actLoading())
        movieApi.bookTicket(thongTinDatVe, localStorage.getItem(TOKEN)).then(() => {
            dispatch(actFetchShowtimeReload(Id))
            dispatch(actFinish())
            setTimeout(() => {
                dispatch(actHideLoading())
                setTimeout(() => {
                    waveSuccess()
                    dispatch(actTransferTab())
                    window.scrollTo(0,0)
                }, 1000)
            }, 5500)
        }).catch(Err => {
            dispatch(actHideLoading())
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const { listShowtime, loading, error, danhSachGheDangDat } = useSelector(state => state.ShowtimeFilmReducer)
    const { currentUser } = useSelector(state => state.authReducer)
    if (loading) return <div className="loader" style={{ paddingTop: '10%', margin: '0 45%' }}>
        <img src="https://gifimage.net/wp-content/uploads/2018/11/transparent-loading-gif-free-4.gif" style={{ width: '120px', height: '120px' }}></img>
    </div>
    return listShowtime && (
        <div>
            <div className="result-bg">
                <div className="grid grid-cols-12 gap-0 showtime_book">
                    <div className="span_8">
                        <div className="content-movie">
                            <div className="container-film container">
                                <div className="custom">
                                    <div className="icon-movie" style={{ marginRight: '10px', color: 'red' }}>
                                        <i class="fas fa-circle"></i>
                                    </div>
                                    <div className="icon-movie" style={{ marginRight: '10px', color: '#FFCC33'}}>
                                        <i class="fas fa-circle"></i>
                                    </div>
                                    <div className="icon-movie" style={{ marginRight: '10px', color: '#00CC00'}}>
                                        <i class="fas fa-circle"></i>
                                    </div>
                                </div>
                                <div className="trapezoid mt-10">
                                </div>
                                <div className="list mt-5">
                                    {
                                        listShowtime.danhSachGhe?.map((ghe, index) => {
                                            let gheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
                                            let gheDaDat = ghe.daDat === true ? 'gheDaDat' : ''
                                            let gheDangDat = '';
                                            let ind = danhSachGheDangDat.findIndex(item => item.maGhe === ghe.maGhe)
                                            if (ind !== -1) {
                                                gheDangDat = 'gheDangDat'
                                            }
                                            let gheBanDat = ''
                                            if (ghe.taiKhoanNguoiDat === currentUser?.taiKhoan) {
                                                gheBanDat = 'gheBanDat';
                                            }
                                            return <Fragment key={index}>
                                                {
                                                    <button className={`ghe ${gheVip} ${gheDaDat} ${gheDangDat} ${gheBanDat}`} disabled={ghe.daDat} onClick={() => dispatch({
                                                        type: BOOK_TICKET,
                                                        payload: ghe
                                                    })}>
                                                        {ghe.daDat ? gheBanDat !== '' ? <i class="far fa-user"></i> : <i className="far fa-times-circle circle" ></i> : ghe.stt}
                                                    </button>
                                                }
                                            </Fragment>
                                        })
                                    }
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80px', width:'80%', border:'1px solid white', margin:'0 auto', borderRadius:'6px'}} className="notice_showtime">
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft:'20px'}} >
                                  <button className="ghe">
                                  </button>
                                  <span style={{color:'white', fontSize:'18px'}}>Ghế thường</span>
                              </div>
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft:'20px'}} >
                                  <button className="gheVip">
                                  </button>
                                  <span style={{color:'white', fontSize:'18px'}}>Ghế Vip</span>
                              </div>
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft:'20px'}} >
                                  <button className="gheDaDat">
                                  </button>
                                  <span style={{color:'white', fontSize:'18px'}}>Ghế đã đặt</span>
                              </div>
                              <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft:'20px'}} >
                                  <button className="gheBanDat">
                                  </button>
                                  
                                  <span style={{color:'white', fontSize:'18px'}}>Ghế bạn đặt</span>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="span_4">
                        <div className="content-result pt-30">
                            <div className="img-result">
                                <img src={listShowtime.thongTinPhim?.hinhAnh} onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://i.pinimg.com/736x/a1/88/3a/a1883aa6e53df2b48626a655d67ea4da.jpg";
                                }
                                } />
                            </div>
                            <h3 style={{ color: 'white', }} className="title_film_showtime">{listShowtime.thongTinPhim?.tenPhim}</h3>
                            <p className="text-left  my-4">{listShowtime.thongTinPhim?.diaChi}</p>
                            <p className="text-left  my-4">Ngày chiếu: {listShowtime.thongTinPhim?.ngayChieu} - {listShowtime.thongTinPhim?.tenRap}</p>
                            <hr></hr>

                            <table className="table mx-0 my-5" style={{ color: '#fff', width: '100%', border: '1px solid gray' }}>
                                <thead style={{ padding: '10px 0', height: '40px'}}>
                                    <tr style={{ border: '1px solid gray', padding: '10px 0' }}>
                                        <th scope="col">Ghế</th>
                                        <th scope="col">Tiền vé</th>
                                    </tr>
                                </thead>
                                <tbody style={{ padding: '10px 0' }}>
                                    {
                                        _.sortBy(danhSachGheDangDat, ['stt']).map((item, index) => {
                                            return <tr>
                                                <td>{item.stt}</td>
                                                <td>{item.giaVe.toLocaleString()}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            <div style={{ color: '#fff', fontSize: '16px' }} className="my-5 text-right">
                                Tổng tiền: {
                                    danhSachGheDangDat.reduce((sum, ghe) => {
                                        return sum += ghe.giaVe
                                    }, 0).toLocaleString()} đồng
                            </div>
                            <hr></hr>
                            <div className="information-result text-left my-2">
                                <h3>Account</h3>
                                <h4>{currentUser?.taiKhoan}</h4>
                            </div>
                            <hr>
                            </hr>
                            <div className="information-result text-left my-2">
                                <h3>Email</h3>
                                <h4>{currentUser?.email}</h4>
                            </div>
                            <hr></hr>
                            <div className="mb-0 mt-10">
                                <button className="btn-book" onClick={showModal}>BOOK TICKET</button>
                                <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} width={380} style={{ borderRadius: '20px'}} onOk={handleYes}>
                                    <div className="container">
                                        <div className="cookiesContent" id="cookiesPopup">
                                            <img src="https://media1.giphy.com/media/RJsxVoYoEYxN57jeXv/source.gif" alt="cookies-img" />
                                            <p>
                                                Are you sure to book these movie tickets ?</p>
                                            <button className="accept" onClick={() => handleYes()}>Book Tickets!</button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {isLoading ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl " style={{ transition: 'all 3s' }} >
                                <div className="trailer-film-item">
                                    <div className="text-4xl text-white">
                                        <img src="https://thumbs.gfycat.com/ConventionalOblongFairybluebird-max-1mb.gif" style={{ width: '120px', height: '120px' }}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        </div>
    )
}


