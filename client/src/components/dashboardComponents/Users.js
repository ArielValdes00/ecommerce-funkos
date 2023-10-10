import React, { useState } from 'react'
import { assignAdminRole, deleteUsers } from '../../../utils/apiUsers';

const Users = ({ allUsers, session, toast }) => {
    const [users, setUsers] = useState(allUsers);
    const userRole = session.user.role;

    const handleDelete = async (id) => {
        if (userRole === 'superAdmin') {
            try {
                await deleteUsers(id)
                const updateUsers = users.filter(user => user.id !== id)
                setUsers(updateUsers)
            } catch (error) {
                console.error(error)
            }
        } else {
            toast.error('Forbidden: You do not have permission to perform this action.')
        }
    }

    const handleAssignAdminRole = async (id) => {
        if (userRole === 'superAdmin') {
            try {
                await assignAdminRole(id);

                const updatedUsers = users.map((user) => {
                    if (user.id === id) {
                        return { ...user, role: 'admin' };
                    }
                    return user;
                });

                setUsers(updatedUsers);
            } catch (error) {
                console.error(error);
            }
        } else {
            toast.error('Forbidden: You do not have permission to perform this action.')
        }
    };

    const formatDate = (isoDate) => {
        if (!isoDate) {
            return "Google Account";
        }
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className='bg-gray-100'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
                {users.map((user) => (
                    <ol key={user.id} className='bg-white p-3 m-2 rounded-lg border'>
                        <ul className='flex flex-col gap-2 font-semibold capitalize'>
                            <li className='flex justify-between'>
                                <p>Name:</p>
                                <p className='font-normal'>{user.name}</p>
                            </li>
                            <li className='flex justify-between'>
                                <p>Email:</p>
                                <p className='normal-case font-normal'>{user.email}</p>
                            </li>
                            <li className='flex justify-between'>
                                <p>areaCode:</p>
                                <p className='font-normal'>{!user.areaCode ? '-' : user.areaCode}</p>
                            </li>
                            <li className='flex justify-between'>
                                <p>phone number:</p>
                                <p className='font-normal'>{!user.phoneNumber ? '-' : user.phoneNumber}</p>
                            </li>
                            <li className='flex justify-between'>
                                <p>role:</p>
                                <p className='font-normal'>{user.role === 'superAdmin' ? 'super admin' : user.role}</p>
                            </li>
                            <li className='flex justify-between'>
                                <p>created at:</p>
                                <p className='font-normal'>{formatDate(user.createdAt)}</p>
                            </li>
                            <li className='flex justify-between mt-2'>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className='rounded px-3 py-1 bg-red-600 text-white font-semibold hover:bg-red-700'>Delete
                                </button>
                                <button
                                    onClick={() => handleAssignAdminRole(user.id)}
                                    className='rounded px-3 py-1 bg-blue-600 text-white font-semibold hover:bg-blue-700'>Assign Admin Role
                                </button>
                            </li>
                        </ul>
                    </ol>
                ))}
            </div>
        </div >
    )
}

export default Users