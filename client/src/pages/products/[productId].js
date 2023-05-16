import React from 'react'

const productId = () => {
  return (
    <div>

    </div>
  )
}

export async function getServerSideProps({query: {productId}}) {
    console.log(productId)
    return {
        props:{

        }
    }
}

export default productId
