
import React from 'react'
import Footer from '../containers/shared/Footer/Footer'
import Header from '../containers/shared/Header/Header'
import withLayout from '../hocs/withLayout'

 function ClientLayout(props) {
    return (
        <>
           <Header/>
           {props.children}
           <Footer/>
        </>
    )
}
export default withLayout(ClientLayout)
