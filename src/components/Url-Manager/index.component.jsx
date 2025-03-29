import './index.css';
import React from 'react'
import Urls from './Urls/index.component'
import UrlsContainer from './UrlsContainer/index.component'
import { UrlProvider } from '../../Context/url-context';

const UrlManager = () => {
    return (
        <div className='flex flex-row justify-around w-auto'>
            <UrlProvider>
                <Urls />
                <UrlsContainer />
            </UrlProvider>
        </div>
    )
}

export default UrlManager