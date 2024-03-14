"use client";

import React from "react";
import { UserTableProps } from "./TableInterface";

const UserTableTemplate: React.FC<UserTableProps> = ({
  allUsers,
  deleteSelected,
  openEditPopup,
  setModal,
}) => (
  <div className="container mt-4 w-3/4 bg-white">
    <div className="container mx-auto px-4 py-4">
      <div className="grid md:grid-cols-1 gap-4">
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 float-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 flex items-center justify-center gap-2 sm:w-auto md:w-auto"
            onClick={() => setModal((prev) => !prev)}
          >
            Create Employee
          </button>
        </div>
        <div className="bg-white shadow-md rounded px-4 py-4">
          <table className="table-auto border-collapse border border-gray-800 w-full">
            <thead>
              <tr className="border-b border-gray-800 text-center">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user) => (
                <tr
                  key={user?.id}
                  className="border border-gray-800  hover:bg-gray-100 text-center"
                >
                  <td className="px-4 py-2">{user?.name}</td>
                  <td className="px-4 py-2">{user?.email}</td>
                  <td className="px-4 py-2">{user?.department}</td>
                  <td className="px-4 py-2 flex items-center justify-center gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mr-2"
                      onClick={() => openEditPopup(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                      onClick={() => deleteSelected(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default UserTableTemplate;
