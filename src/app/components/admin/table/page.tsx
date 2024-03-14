"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios for making HTTP requests

import UserTableTemplate from "./TableTemplate";
import UserFormComponent from "../form/page";
import { UserDetails, deleteUser } from "@/services/api";

const initialFormValues = {
  name: "",
  email: "",
  department: "",
};

const UserTableComponent: React.FC = () => {
  const [formdata] = useState(initialFormValues);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModal, setModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch all users from the server when the component mounts
    getAllUsers();
  }, [isModal]);

  const getAllUsers = async () => {
    try {
      const url = "employee/users";
      const response: any = await UserDetails(url);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUserHandler = async (userId: string) => {
    try {
      await deleteUser(`employee/users/${userId}`);
      getAllUsers();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user!");
    }
  };

  const openEditPopup = (user: any) => {
    setSelectedUser(user);
    setModal(true);
  };

  const handleEditUserUpdate = () => {
    getAllUsers();
    setModal(false);
  };

  return (
    <>
      <UserFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        user={selectedUser}
        onUpdate={handleEditUserUpdate}
      />
      <UserTableTemplate
        formValues={formdata}
        allUsers={allUsers}
        deleteSelected={deleteUserHandler}
        openEditPopup={openEditPopup}
        setModal={setModal}
      />
    </>
  );
};

export default UserTableComponent;
