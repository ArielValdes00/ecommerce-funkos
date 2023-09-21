import React, { useState } from 'react'
import { deleteUsers } from '../../../utils/apiUsers';

const Users = ({ allUsers }) => {
    const [users, setUsers] = useState(allUsers);

    const handleDelete = async (id) => {
        try {
            await deleteUsers(id)
            const updateUsers = users.filter(user => user.id !== id)
            setUsers(updateUsers)
        } catch (error) {
            console.error(error)
        }
    }

    const formatDate = (isoDate) => {
        if (!isoDate) {
            return "Google Account";
        }
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className='md:h-screen'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
                {users.map((user) => (
                    <ol key={user.id} className='bg-white my-2 border px-3 flex justify-between px-1 py-4 mx-2 rounded-lg'>
                        <ul className='flex flex-col gap-2 font-semibold'>
                            <li>Name: </li>
                            <li>Email: </li>
                            <li>Area Code: </li>
                            <li>Number: </li>
                            <li>Created At: </li>
                            <div className='mt-1'>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className='rounded px-3 py-1 bg-red-600 text-white font-semibold'>Delete
                                </button>
                            </div>
                        </ul>
                        <ul className='flex flex-col gap-2 text-end'>
                            <li className='capitalize'>{user.name}</li>
                            <li>{user.email}</li>
                            <li>{!user.areaCode ? '-' : user.areaCode}</li>
                            <li>{!user.phoneNumber ? '-' : user.phoneNumber}</li>
                            <li>{formatDate(user.createdAt)}</li>
                        </ul>
                    </ol>
                ))}
            </div>
        </div>
    )
}

export default Users