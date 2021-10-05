
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ShowTime.css'
import Loader from '../../Loader/Loader';
import { actFetchPlace } from './module/action';
import { SELECT_FILM, SELECT_VIEWINGTIMES } from './module/types';
import Movie from './Movie';
import Paginate from './Pagination';
export default function ShowTime(props) {
    const { listPlace, cumRap, ViewingTimes, loading } = useSelector(state => state.PlaceReducer)
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)
    // get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts =  ViewingTimes.danhSachPhim?.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const nextPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const prevPage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(actFetchPlace())
    }, []);
    const chonCumRap = () => {
        let RapDuocChon = document.getElementById("rap").value;
        setCurrentPage(1)
        setPostsPerPage(4)
        dispatch({
            type: SELECT_FILM,
            payload: RapDuocChon
        })
    }
    const chonLichChieu = () => {
        var cumRapChieu = document.getElementById("mySelect").value;
        setCurrentPage(1)
        setPostsPerPage(4)
        dispatch({
            type: SELECT_VIEWINGTIMES,
            payload: cumRapChieu,
        })
    }
    if(loading) return <Loader/>
    return listPlace &&(
        <div style={{width:'100%', backgroundColor:'#F5F5F5', }} className="page_movie">
        <div className="container showtime_template" >
            <div className="container button text-left mb-7 pt-10 core">
            <h1 className="showtime_label">SHOWTIME NOW</h1>
            </div>
            <div className="show_pagination container px-50 mx-auto">
                <div className="flex-movie">
                    <div className="Array">
                        <div>
                            <select class="form-control form-movie" id="rap"  onChange={() => chonCumRap()}>
                                {
                                    listPlace.map((item, index) => {
                                        return (
                                            <option value={item.maHeThongRap} key={index}>{item.maHeThongRap}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="ml-10 rap_chieu">
                            <select class="form-control form-movie" id="mySelect" defaultValue={cumRap[0]?.tenCumRap} onChange={() => chonLichChieu()}>
                                {
                                    cumRap.map((rap, index) => {
                                        if (rap !== '') {
                                            return (
                                                <option value={rap.tenCumRap}  key={index}>{rap.tenCumRap}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto" style={{  width: '100%', height:'2000px'}} className="page_movie">
                <Movie listFilm={ViewingTimes} posts={currentPosts}/>
                <Paginate postsPerPage={postsPerPage} totalPosts={ViewingTimes.danhSachPhim?.length} style={{ marginTop: '30px' }} paginate={paginate} pageNumber={currentPage} nextPage={nextPage} prevPage={prevPage} />
            </div>
        </div>
        </div>
    )
}
