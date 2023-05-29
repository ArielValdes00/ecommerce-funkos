import React, { useState, useEffect } from 'react'
import { deleteUsers, getUsers } from '../../../utils/apiUsers';

const users = () => {
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
            <ul className='grid grid-cols-6 text-center border-b py-3 font-bold text-lg'>
                <p>Name</p>
                <p>Email</p>
                <p>Area Code</p>
                <p>Phone Number</p>
                <p>Created At</p>
                <p>Delete user</p>
            </ul>
            {users.map((user) => (
                <ul key={user.id} className='grid grid-cols-6 py-4 text-center items-center border-b'>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.areaCode}</li>
                    <li>{user.phoneNumber}</li>
                    <li>{user.createdAt}</li>
                    <div>
                        <button onClick={() => handleDelete(user.id)} className='border-2 border-black px-3 py-1 bg-red-500 font-semibold'>Delete</button>
                    </div>
                </ul>
            ))}
        </div>
    )
}


export default users