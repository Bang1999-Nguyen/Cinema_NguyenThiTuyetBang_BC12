import { disabled } from 'glamor';
import React from 'react'
import './ShowTime.css'
const Paginate = ({ postsPerPage, totalPosts, paginate, pageNumber, nextPage, prevPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px', textAlign: 'center', marginRight: '0px' }} >
             <div className="result_page">
                <button>
                    <span>{pageNumber}  /  {Math.ceil(totalPosts / postsPerPage)} Page</span>
                </button>
            </div>
            <div className="icon-previous">
                <button onClick={() => prevPage(pageNumber--)} style={{backgroundColor:'#444B6E', color:'#fff', borderRadius:'5px 0 0 5px', border:'1.5px solid #3D315B', fontWeight:'600', pointerEvents: `${pageNumber < 2 ? 'none' : 'auto'}`,backgroundColor: `${pageNumber < 2 ? 'gray' : '#444B6E'}`}} className="previous_btn">Previous</button>
            </div>
            <nav className="pagination" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center' }}>
                {
                    pageNumbers.map((number) => {
                        return (
                            <li key={number} className="page-item" style={{ textAlign: 'center', backgroundColor: `${pageNumber === number ? '#9AB87A' : '#444B6E'}`, listStyle: 'none',border:'1.5px solid #3D315B'}} className="single_page">
                                <a className="page-link" style={{ color: 'black', textAlign: 'center', paddingRight: '0px', paddingTop: '8px', fontWeight: 'bold', color:'#fff', }} onClick={() => paginate(number)} className="name_page">
                                    {number}
                                </a>
                            </li>
                        )
                    })
                }
            </nav>
            <div className="icon-next">
                <button onClick={() => nextPage(pageNumber++)} style={{backgroundColor:'#444B6E', color:'#fff', borderRadius:'0 5px 5px 0', border:'1.5px solid #3D315B', fontWeight:'600', backgroundColor: `${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? 'gray' : '#444B6E'}`, pointerEvents: `${pageNumber >= Math.ceil(totalPosts / postsPerPage) ? 'none' : 'auto'}`}} className="next_btn">Next</button>
            </div>
            </div>
    )
}
export default Paginate