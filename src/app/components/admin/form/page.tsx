import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserFormTemplate from "./FormTemplate";
import { registerUser, updateUserDetails } from "@/services/api";

const initialFormValues = {
  id: "",
  name: "",
  email: "",
  department: "",
};

interface UserFormComponentProps {
  isModal: boolean;
  handleClose: () => void;
  user: any;
  onUpdate: () => void;
}

const UserFormComponent: React.FC<UserFormComponentProps> = ({
  isModal,
  handleClose,
  user,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerErrorType>({});

  useEffect(() => {
    setFormData({
      id: user?.id || "",
      name: user?.name || "",
      email: user?.email || "",
      department: user?.department || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const userData = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
      };

      if (formData.id) {
        // Update existing user
        const response: any = await updateUserDetails(
          `employee/users/${formData.id}`,
          userData
        );

        if (response.status === 200) {
          toast.success("Employee updated successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      } else {
        // Create new user
        const response: any = await registerUser("employee/users", userData);

        if (response.status === 201) {
          toast.success("Employee added successfully");
          setLoading(false);
          setFormData(initialFormValues);
          onUpdate();
          handleClose();
        }
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        toast.error("Validation error. Please check the fields.");
        setErrors(error.response.data.errors);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  const handleClosePopup = () => {
    setFormData(initialFormValues); // Clear formData before closing
    handleClose();
  };

  return (
    <UserFormTemplate
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isModal={isModal}
      handleClose={handleClosePopup}
      errors={errors}
      loading={loading}
    />
  );
};

export default UserFormComponent;
