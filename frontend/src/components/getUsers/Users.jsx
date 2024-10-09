import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Add from '../addUsers/Add'
import axios from 'axios'
import toast from 'react-hot-toast'


const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/getAllUsers");
      setUsers(response.data.usersData);
      console.log(users);
    }
    fetchData()
  }, [users])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/deleteUser/${id}`)
      .then((res) => {
        toast.success("User deleted sucessfully!", { position: "bottom-center" })
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        console.log(res);
      }).catch(err => console.log(err));
  }

  return (
    <div>
      <div className='md:w-[70%] mt-4 flex flex-col justify-stretch m-auto'>
        
        <div>
          <Link to={'/add'}>
            <button className='ml-4 mb-6 btn btn-neutral btn-sm'>
              ADD USER
            </button>
          </Link>
        </div>

        <table className="table mb-4">
          <thead>
            <tr>
              <th className='text-xl'>S.No.</th>
              <th className='text-xl'>Name</th>
              <th className='text-xl'>Email</th>
              <th className='text-xl'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => {
              return (
                <tr key={user._id} className='cursor-default'>
                  <th>{idx + 1}</th>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td className='flex gap-2'>
                    <button className="btn btn-sm btn-info">
                      <Link to={`/edit/`+user._id}>UPDATE</Link></button>
                    <button className="btn btn-sm btn-error"
                      onClick={()=>handleDelete(user._id)}
                    >DELETE</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
     </div>
  )
}

export default User