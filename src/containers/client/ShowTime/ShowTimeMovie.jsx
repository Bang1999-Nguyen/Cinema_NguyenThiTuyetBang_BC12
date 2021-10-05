
import React from 'react'
import { Redirect } from 'react-router'
import { USER_LOGIN, TOKEN} from '../../../setting/apiConfig'
import Footer from '../../shared/Footer/Footer'
import ContentShowtime from './ContentShowtime/ContentShowtime'
import HeaderShowTime from './HeaderShowtime/HeaderShowTime'

export default function ShowTimeMovie(props) {
    const {Id} = props.match.params
    if (!localStorage.getItem(USER_LOGIN) || !localStorage.getItem(TOKEN)){
        return <Redirect to='/logIn'/>
    }
    return (
        <div>
           <HeaderShowTime Id={Id}/>
           <Footer/>
        </div>
    )
}