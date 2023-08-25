import React, { useState, useEffect } from 'react'
import { deleteUsers, getUsers } from '../../utils/apiUsers';

const Users = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUsers(id)
            const updateUsers = users.filter(user => user.id !== id)
            setUsers(updateUsers)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className='bg-gray-100'>
                <div>
                    <ul className='grid grid-cols-6 text-center gap-7 border-b border-black py-3 font-bold text-xl'>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Area Code</p>
                        <p>Phone Number</p>
                        <p>Created At</p>
                        <p>Delete User</p>
                    </ul>
                    {users.map((user) => (
                        <ul key={user.id} className='grid grid-cols-6 gap-7 py-4 text-center items-center border-black border-b text-lg '>
                            <li>{user.name}</li>
                            <li>{user.email}</li>
                            <li>{user.areaCode}</li>
                            <li>{user.phoneNumber}</li>
                            <li>{user.createdAt}</li>
                            <div>
                                <button onClick={() => handleDelete(user.id)} className='rounded px-4 py-2 bg-red-600 text-white font-semibold'>Delete</button>
                            </div>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Users