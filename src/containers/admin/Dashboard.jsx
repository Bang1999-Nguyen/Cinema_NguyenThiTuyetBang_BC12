import React from 'react'
import './Admin.css'
export default function Dashboard(props) {
    return (
        <div className="admin_dashboard">
            <svg xmlns="http://www.w3.org/2000/svg">
                <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
                </filter>
            </svg>
            <span filter-content="S">Welcome To The Admin Page!</span>
            <img src="./images/clip-problem-solving.png" style={{ marginTop: '-5%',width:'70%', margin:'0 auto' }}></img>
        </div>
    )
}
