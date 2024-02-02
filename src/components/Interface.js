/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";
import { toast } from "react-toastify";
import Table from "./Table";
import PageHandler from "./PageHandler";
import EditData from "./EditData";
import { ToastContainer } from "react-toastify";


const URL = "https://anubhav-fortsu.onrender.com";

const Interface = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setfilterUsers] = useState([]);
  const [page, setpage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [edit, setEdit] = useState(null);
  const [toggle, setToggle] = useState(false);

  const itemsPerPage = 7;

  useEffect(() => {
    fetchTheData();
  }, [toggle]);

  const fetchTheData = async () => {
    try {
      const response = await axios.get(`${URL}/api/v1/students/getAllStudents`);
      console.log(response.data);
      setUsers(response.data.students);
      setfilterUsers(response.data.students);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



  const handleEdit = (id) => {
    setEdit(id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URL}/api/v1/admin/${id}`);
      console.log(res.data, "res");
      setfilterUsers(res.data.students);
      setToggle(!toggle)

      toast.error("Deleted Successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Deletion Failed!");
    }
  };

  const handlePage = (page) => {
    setpage(page);
  };

  const assignScholarships = async()=>{
    try{
      const res = await axios.get(`${URL}/api/v1/admin/assignScholarship`);

      console.log(res)

      setToggle(!toggle)

      if(res.data.status==="success")
      toast.success("Successfully assigned scholarship to eligible candidates")
      else 
      toast.warning("No students found for assignment")
    }catch(error)
    {
      console.log(error);
      toast.error("Scolarship Assignment Failed!");
    }

  }


 
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filterUsers.slice(startIndex, endIndex);

  return (
    <div className=" bg-blue-100 h-full flex flex-col">
      <div className="flex justify-center align-middle m-5"><button onClick={assignScholarships} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50 mt-50">Assign Scholarships</button></div>
    <div className="container flex">
    
      <div className="w-1/12  bg-blue-950 p-10"></div>
      
      <div className="container mt-20">
  
        <Table users={currentUsers} handleEdit={handleEdit} handleDelete={handleDelete} setEdit={setEdit} edit={edit} setToggle={setToggle} toggle={toggle}  />
      </div>
      </div>
      <div className="justify-center flex mb-8"><PageHandler currentPage={page} itemsPerPage={itemsPerPage} totalItems={filterUsers.length} handlePagination={handlePage} /></div>
    </div>
  );
};

export default Interface;
