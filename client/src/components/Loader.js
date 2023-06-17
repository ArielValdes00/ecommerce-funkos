import React from 'react'
import Image from 'next/image'
import LoaderGif from '../../public/icons/loader.gif'

const Loader = () => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <Image src={LoaderGif} width={200} height={200} alt='Loader'/>
    </div>
  )
}

export default Loader