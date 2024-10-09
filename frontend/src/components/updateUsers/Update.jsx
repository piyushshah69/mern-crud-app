import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const { id } = useParams(); 
    const initialUser = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    }
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/getOneUser/${id}`)
            .then((res) => {
                setUser(res.data)
                console.log(res);
                
            }).catch((err)=> console.log(err))
    }, [id])

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/updateUser/${id}`, user)
            .then((res) => {
                toast.success("Updated sucessfully!", { position: "bottom-center" })
                console.log(res);
            }).catch(err => console.log(err));
        navigate('/');
    }

  return (
      <div className='flex justify-center'>
          <form className='w-[90%] md:w-[70%] lg:w-[50%] m-16 flex flex-col items-start gap-4'
              onSubmit={handleSubmit}>
              <Link to={'/'}>
                  <button className='btn btn-neutral btn-sm text-xl'>←</button>
              </Link>
              <div className='flex justify-between gap-4 w-full'>
                  <label className="input input-bordered flex items-center w-[50%]">
                      <input type="text" onChange={handleChange}
                          value={user.firstname} className="grow" name='firstname' placeholder="Firstname" />
                  </label>
                  <label className="input input-bordered flex items-center w-[50%]">
                      <input type="text" onChange={handleChange} value={user.lastname} className="grow" name='lastname' placeholder="Lastname" />
                  </label>
              </div>
              <label className="input input-bordered flex items-center gap-2 w-full">
                  <input type="text" onChange={handleChange} value={user.email} className="grow" name='email' placeholder="Email Address" />
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                  <input type="password" onChange={handleChange} value={user.password} className="grow" name='password' placeholder="Password" />
              </label>
              <button className='btn btn-success w-full' type='submit'>UPDATE</button>
          </form>
      </div>
  )
}

export default Update