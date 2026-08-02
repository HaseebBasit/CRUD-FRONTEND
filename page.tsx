"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./globals.css";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default function Home() {

  const api = "https://crud-backend-rwpa.onrender.com";

  const [users, setUsers] = useState<User[]>([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editId, setEditId] = useState<string | null>(null);

  const [message, setMessage] = useState("");



  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        `${api}/api/users`
      );

      setUsers(res.data.data || []);

    } catch(error) {

      console.log(error);

    }

  };



  const addUser = async () => {

    try {

      await axios.post(
        `${api}/api/user/add`,
        {
          username,
          email,
          password
        }
      );


      setMessage("User added successfully ✅");

      clearForm();

      fetchUsers();


    } catch(error:any) {

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );

    }

  };



  const deleteUser = async (id:string) => {

    try {

      await axios.delete(
        `${api}/api/user/delete/${id}`
      );


      setMessage("User deleted successfully ✅");

      fetchUsers();


    } catch(error:any) {

      setMessage(
        error.response?.data?.message || "Delete failed"
      );

    }

  };



  const editUser = (user:User) => {

    setEditId(user.id);

    setUsername(user.username);

    setEmail(user.email);

    setPassword(user.password);

    setMessage("");

  };



  const updateUser = async () => {

    try {

      await axios.put(
        `${api}/api/user/update/${editId}`,
        {
          username,
          email,
          password
        }
      );


      setMessage("User updated successfully ✅");

      clearForm();

      fetchUsers();


    } catch(error:any) {

      setMessage(
        error.response?.data?.message || "Update failed"
      );

    }

  };



  const clearForm = () => {

    setUsername("");

    setEmail("");

    setPassword("");

    setEditId(null);

  };



  useEffect(() => {

    fetchUsers();

  }, []);



  return (

    <div className="container">


      <h1>
        User Management System
      </h1>



      {
        message &&

        <div className="message">
          {message}
        </div>

      }



      <div className="form-card">


        <h2>
          {editId ? "Update User" : "Add New User"}
        </h2>


        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        {

          editId ?

          <button
            className="add-btn"
            onClick={updateUser}
          >
            Update User
          </button>

          :

          <button
            className="add-btn"
            onClick={addUser}
          >
            Add User
          </button>

        }


      </div>





      <div className="table-card">


        <table>


          <thead>

            <tr>

              <th>ID</th>

              <th>Username</th>

              <th>Email</th>

              <th>Password</th>

              <th>Actions</th>

            </tr>


          </thead>



          <tbody>


          {

            users.length === 0 ?

            <tr>

              <td colSpan={5}>
                No users available
              </td>

            </tr>


            :


            users.map((user)=>(

              <tr key={user.id}>


                <td>
                  {user.id}
                </td>


                <td>
                  {user.username}
                </td>


                <td>
                  {user.email}
                </td>


                <td>
                  {user.password}
                </td>


                <td>


                  <button

                    className="edit-btn"

                    onClick={()=>editUser(user)}

                  >

                    Edit

                  </button>



                  <button

                    className="delete-btn"

                    onClick={()=>deleteUser(user.id)}

                  >

                    Delete

                  </button>


                </td>


              </tr>

            ))

          }


          </tbody>


        </table>


      </div>


    </div>

  );

}