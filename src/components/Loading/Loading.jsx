import React from 'react'
import Header from '../../containers/shared/Header/Header'
import './Loading.scss'
export default function Loading() {
    return (
        <div>
            <div className="loading_lazy">
                <div style={{ height: '100vh', position: 'fixed', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection:'column' }}>
                    <img src="https://media1.giphy.com/media/RJsxVoYoEYxN57jeXv/source.gif" width={200} height={200} style={{ margin: '0 auto', width: '15%' }}></img>
                    <h1><span>LOAD</span><span>ING........</span></h1>
                </div></div>
        </div>
    )
}
