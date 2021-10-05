import React from 'react'

export default function Loader() {
    return (
        <div >
            <div className="loader" style={{ paddingTop: '15%', margin: '0 45%' }}>
                <img src="./images/loading-gif.gif" style={{ width: '80px', height: '80px' }}></img>
            </div>
        </div>
    )
}
