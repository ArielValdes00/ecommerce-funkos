import React from 'react';
import Tiktok from '../../public/icons/tik-tok.png';
import Facebook from '../../public/icons/facebook.png';
import Youtube from '../../public/icons/youtube.png';
import Twitter from '../../public/icons/twitter.png';
import Instagram from '../../public/icons/instagram.png';
import Image from 'next/image';
import Link from 'next/link';

const BannerSocialMedia = () => {
    return (
        <div className='flex justify-center items-center bg-black text-white h-28 gap-5'>
            <Link href={"https://www.youtube.com/channel/UCiBxZWamaDdlemljJ3aGPZQ"} target='_blank' className='rounded-full p-3 bg-white'>
                <Image src={Youtube} height={25} width={25} alt='Youtube'></Image>
            </Link>
            <Link href={"https://www.instagram.com/originalfunko/"} target='_blank' className='rounded-full p-3 bg-white'>
                <Image src={Instagram} height={25} width={25} alt='Instagram'></Image>
            </Link>
            <Link href={"https://www.facebook.com/originalfunko"} target='_blank' className='rounded-full p-3 bg-white'>
                <Image src={Facebook} height={25} width={25} alt='Facebook'></Image>
            </Link>
            <Link href={"https://twitter.com/OriginalFunko"} target='_blank' className='rounded-full p-3 bg-white'>
                <Image src={Twitter} height={25} width={25} alt='Twitter'></Image>
            </Link>
            <Link href={"https://www.tiktok.com/@originalfunko?lang=en"} target='_blank' className='rounded-full p-3 bg-white'>
                <Image src={Tiktok} height={25} width={25} alt='Tiktok'></Image>
            </Link>
        </div>
    )
}

export default BannerSocialMedia