import React, { useState } from 'react'
import { assignAdminRole, deleteUsers } from '../../../utils/apiUsers';
import ModalConfirm from './ModalConfirm';
import useBooleanState from '@/hooks/useBooleanState';

const Users = ({ allUsers, session, toast }) => {
    const [users, setUsers] = useState(allUsers);
    const [showModalDeleteUser, toggleShowModalDeleteUser] = useBooleanState(false);
    const [assignAdminModalOpen, toggleAssignAdminModalOpen] = useBooleanState(false);
    const [userId, setUserId] = useState(null);
    const userRole = session.user.role;

    const handleDelete = async (id) => {
        if (userRole === 'superAdmin') {
            try {
                await deleteUsers(id)
                const updateUsers = users.filter(user => user.id !== id)
                setUsers(updateUsers);
                toggleShowModalDeleteUser();
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
                toggleAssignAdminModalOpen();
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

    const openModalDeleteUser = (userId) => {
        setUserId(userId);
        toggleShowModalDeleteUser();
    }

    const openModalAssingAdminRole = (userId) => {
        setUserId(userId);
        toggleAssignAdminModalOpen();
    }

    return (
        <div className='bg-gray-100'>
            {showModalDeleteUser && (
                <ModalConfirm
                    title={'Delete User'}
                    text={'Are you sure you want to delete this user?'}
                    handleCloseModal={() => toggleShowModalDeleteUser()}
                    handleConfirm={() => handleDelete(userId)}
                    action={'Delete'}
                    color={'bg-red-500 hover:bg-red-600'}
                />
            )}
            {assignAdminModalOpen && (
                <ModalConfirm
                    title={'Assign Admin Role'}
                    text={'Are you sure you want to assign the Admin role to this user?'}
                    handleCloseModal={() => toggleAssignAdminModalOpen(false)}
                    handleConfirm={() => handleAssignAdminRole(userId)}
                    action={'Assign Admin'}
                    color={'bg-blue-500 hover:bg-blue-600'}
                />
            )}
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
                                    onClick={() => openModalDeleteUser(user.id)}
                                    className='rounded-md px-3 py-1 bg-red-500 text-white font-normal hover:bg-red-00'>
                                    Delete
                                </button>
                                <button
                                    onClick={() => openModalAssingAdminRole(user.id)}
                                    className='rounded-md px-3 py-2 bg-blue-500 text-white font-normal hover:bg-blue-00'>
                                    Assign Admin Role
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