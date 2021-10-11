import React from 'react'
import './Loader.css'
export default function Loader() {
    return (
        <div className="loading_">
            <div className="loader" style={{ paddingTop: '15%', margin: '0 45%' }}>
                <img src="./images/loading-gif.gif"></img>
            </div>
        </div>
    )
}
