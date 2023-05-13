
const navbar = () => {
    return (
        <header>
            <nav className='grid grid-cols-4 items-center p-3 bg-black text-white font-semibold text-md px-28'>
                <div className=''>
                    <span className='text-2xl'>FUNKO</span>
                </div>
                <div className='col-span-2'>
                    <ul className='flex justify-around'>
                        <li>HOME</li>
                        <li>PRODUCTS</li>
                        <li>CATEGORIES</li>
                        <li>CONTACT</li>
                    </ul>
                </div>
                <div className='text-end mx-5'>
                    <span className="">U</span>
                    <span className='ms-10'>C</span>
                </div>
            </nav>
        </header>
    )
}

export default navbar