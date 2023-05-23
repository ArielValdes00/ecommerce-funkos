import React from 'react';
import Tiktok from '../../public/icons/tik-tok.png';
import Facebook from '../../public/icons/facebook.png';
import Youtube from '../../public/icons/youtube.png';
import Twitter from '../../public/icons/twitter.png';
import Instagram from '../../public/icons/instagram.png';
import Image from 'next/image';

const BannerSocialMedia = () => {
    return (
        <div className='flex justify-center items-center bg-black text-white h-28 gap-5'>
            <span className='rounded-full p-3 bg-white'>
                <Image src={Youtube} height={25} width={25} alt='Youtube'></Image>
            </span>
            <span className='rounded-full p-3 bg-white'>
                <Image src={Instagram} height={25} width={25} alt='Instagram'></Image>
            </span>

            <span className='rounded-full p-3 bg-white'>
                <Image src={Facebook} height={25} width={25} alt='Facebook'></Image>
            </span>
            <span className='rounded-full p-3 bg-white'>
                <Image src={Twitter} height={25} width={25} alt='Twitter'></Image>
            </span>
            <span className='rounded-full p-3 bg-white'>
                <Image src={Tiktok} height={25} width={25} alt='Tiktok'></Image>
            </span>
        </div>
    )
}

export default BannerSocialMedia