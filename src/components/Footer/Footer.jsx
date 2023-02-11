import React from 'react'
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram, TiSocialYoutube } from 'react-icons/ti'
import {BiCopyright} from 'react-icons/bi'


const Footer = () => {
    return (
        <div className='footer'>
            <h2> <BiCopyright />ReadWise</h2>
            <ul>
                <li><TiSocialFacebook /></li>
                <li><TiSocialTwitter /></li>
                <li><TiSocialInstagram /></li>
                <li><TiSocialYoutube /></li>
            </ul>
        </div>
    )
}

export default Footer
