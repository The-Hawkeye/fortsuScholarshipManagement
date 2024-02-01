/* eslint-disable no-unused-vars */
import React from "react";
import Row from "./Row";

//For each Row

const Table = ({
  users,
  selectedRows,
  handleRowSelection,
  handleEdit,
  handleDelete,

  setEdit,
  edit,
  setToggle,
  toggle
}) => {
  const currentUsers = users.slice(0, 10); // Only use the first 10 users
  console.log(toggle,"table")
  return (
    <table className="border-separate border-spacing-2 border shadow-2xl table mx-10">
      <thead>
        <tr>
          
          <th className="w-1/10">Name</th>
          <th className="w-1/10 ">Email</th>
          <th className="w-1/10">Roll Number</th>
          <th className="w-1/10">Mobile Number</th>
          <th className="w-1/10">City</th>
          <th className="w-1/10">State</th>
          <th className="w-1/10">Graduation Year</th>
          <th className="w-1/10">Branch</th>
          <th className="w-1/10">Current Year</th>
          <th className="w-1/10">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <Row
            key={user.id}
            user={user}
            selected={selectedRows.includes(user.id)}
            handleRowSelection={handleRowSelection}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setEdit={setEdit}
            edit={edit}
            setToggle={setToggle}
            toggle={toggle}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;