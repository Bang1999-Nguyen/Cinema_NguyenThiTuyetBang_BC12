import React, { Suspense, lazy ,  useEffect, useState} from 'react'
import { Redirect } from 'react-router'
import { TOKEN } from '../../../setting/apiConfig'
import Profile from './Profile'

export default function ProfileTemplate(props) {
    if (!localStorage.getItem(TOKEN)){
        return <Redirect to='/logIn'/>
    }
    return (
        <div style={{position:'relative'}}>
            <Profile/>
        </div>
    )
    
}
