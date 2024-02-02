/* eslint-disable no-useless-computed-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import axios from "axios"

const EditData = ({edit,setEdit,user,setToggle, toggle}) => {

  const url = "https://anubhav-fortsu.onrender.com";

 
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    rollNumber: user.rollNumber || '',
    mobileNumber: user.mobileNumber || '',
    city: user.city || '',
    state: user.state || '',
    graduationYear: user.graduationYear || '',
    branch: user.branch || '',
    currentYear: user.currentYear || '',
    CGPA:user.CGPA||'',
    attendence:user.attendence||''
  })


  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
console.log(id,value,"valueID")
    setFormData({
      ...formData,
      [id]: value
    });
  };

  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.patch(`${url}/api/v1/admin/${user.email}`,formData, {
        headers: {
          'Content-Type': 'application/json'
        }});
  
        console.log(res.data, res)
        setEdit(false);
        console.log(toggle,"toggle")
        setToggle(!toggle);
      }
      catch(err){
        console.log(err)
      }
    
  }
  

  return (
    <div className='flex flex-col z-2 fixed right-72 top-10  flex-wrap bg-white p-1 border-3 border-gray-300 shadow-2xl w-3/8'>
    <h1 className='mb-4 text-2xl '>Add Schedule</h1>
    <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex justify-between p-1 gap-2' >
        <label className='w-1/3'>Name</label>
        <input type='text' id='name' placeholder='Title' onChange={handleInputChange} className='border-2 border-gray-400 p-1 w-2/3' value={formData.name}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
        <label className='w-1/3'>Email</label>
        <textarea type='text-area' id='email' placeholder='Description' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.email}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>Roll Number</label>
          <input type='text' id='rollNumber' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.rollNumber}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>Mobile Number</label>
          <input type='text' id='mobileNumber' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.mobileNumber}/>
        </div> 
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>City</label>
          <input type='text' id='city' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.city}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>States</label>
          <input type='text' id='state' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.state}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>Graduation Year</label>
          <input type='text' id='graduationYear' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.graduationYear}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>Branch</label>
          <input type='type' id='branch' className='border-2 border-gray-400 p-1 w-2/3' onChange={handleInputChange} value={formData.branch}/>
        </div>
        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>Current Year</label>
          <input type='text' id='currentYear' placeholder='Subject' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.currentYear}/>
        </div>



        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>CGPA</label>
          <input type='text' id='CGPA' placeholder='CGPA' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.cgpa}/>
        </div>

        <div className='flex justify-between p-1 gap-2'>
          <label className='w-1/3'>Attendence (%)</label>
          <input type='text' id='attendence' placeholder='Attendence in Percent' onChange={handleInputChange} className='border-2 w-2/3 border-gray-400 p-1' value={formData.attendence}/>
        </div>




        <div className='flex justify-end p-1'>
        <button type='button' className='p-2 gap-2 border-2 border-blue-950 mx-2 rounded-md bg-purple-900 text-white text-sm' onClick={()=>setEdit(!edit)}>Cancel</button>
        <button  className='p-2 gap-2 border-2 border-blue-950 mx-2 rounded-md bg-purple-900 text-sm text-white' >Done</button>

        </div>

    </form>         
    </div>
  )
}

export default EditData