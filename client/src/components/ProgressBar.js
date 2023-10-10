import Image from "next/image";
import Icon from '../../public/icons/indicator-icon.svg'
import React, { useState, useEffect } from 'react';

const ProgressBar = ({ totalPrice }) => {
    const [progressPercentage, setProgressPercentage] = useState(0);
    const freeShippingThreshold = 50;

    useEffect(() => {
        const calculateProgressPercentage = () => {
            const percentage = (totalPrice / freeShippingThreshold) * 100;
            setProgressPercentage(percentage > 100 ? 100 : percentage);
        };

        calculateProgressPercentage();
    }, [totalPrice, freeShippingThreshold]);

    const remainingAmount = freeShippingThreshold - totalPrice;
    const shippingStatus = totalPrice >= freeShippingThreshold ? 'FREE SHIPPING' : `$${remainingAmount.toFixed(2)} AWAY FROM FREE SHIPPING`;
    const iconLeft = `${progressPercentage}%`;
    const iconStyle = {
        left: iconLeft,
        marginLeft: '-30px',
        marginTop: '-20px',
    };
    return (
        <div className="relative">
            <div className="h-3 bg-gray-300 rounded-full mb-4">
                <div
                    className="h-full bg-sky-600 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}>
                </div>
                <div className="absolute " style={iconStyle}>
                    <Image
                        src={Icon}
                        width={30}
                        className="bg-gray-100 rounded-full p-1 h-[30px] border border-black"
                        alt="Funko"
                    />
                </div>
            </div>
            <p className="text-center pb-5 pt-2 font-semibold">{shippingStatus}</p>
        </div>
    );
};

export default ProgressBar;

