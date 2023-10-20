import React from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { HiPencil } from 'react-icons/hi';


const ProfileSection = ({ title, data, isEditing, handleInputChange, handleSaveClick, toggleEditing, icon: Icon, error }) => {
    return (
        <div className='bg-white p-4 rounded-lg border w-full'>
            <div className='mb-5 flex items-center gap-2'>
                {Icon && <Icon size={30} />}
                <h2 className='font-extrabold text-2xl'>{title}</h2>
            </div>
            {data.map((item) => (
                <div key={item.name}>
                    <strong>{item.label}: </strong>
                    {isEditing ? (
                        <input
                            type={item.type}
                            name={item.name}
                            value={!item.value ? '' : item.value}
                            onChange={handleInputChange}
                            className='border py-1 ps-2 w-full rounded-md border-black'
                        />
                    ) : (
                        <span>{item.value}</span>
                    )}
                </div>
            ))}
            {error && (
                <div className="text-sm text-center text-red-500">
                    <p>*{error}</p>
                </div>
            )}
            <div className='flex justify-center mt-5'>
                <button
                    className='w-full flex gap-2 items-center justify-center bg-gray-100 font-semibold rounded-full px-5 py-2 border-2 border-black hover:bg-gray-200'
                    onClick={isEditing ? handleSaveClick : toggleEditing}
                >
                    {isEditing ? <GiConfirmed /> : <HiPencil />}
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );
};

export default ProfileSection;
