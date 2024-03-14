"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { UserLogin } from "@/services/api";
import toast from "react-hot-toast";
import SignInTemplate from "./SignInTemplate";

const initialFormValues = {
  email: "",
  password: "",
};

function Login() {
  const [formdata, setFormdata] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<loginErrorType>({});
  const { data: session } = useSession();

  const onChangeData = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "employee/users/login";
      const response: any = await UserLogin(url, formdata);
      const { UserId, accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("UserId", UserId);

      if (response.status === 200) {
        toast.success("User logged in");
        // Sign in the user and create a session
        signIn("credentials", {
          email: formdata.email,
          password: formdata.password,
          callbackUrl: "/employee/dashboard",
          redirect: true,
        });
      }
    } catch (error: any) {
      const response = error.response;
      if (response && response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        console.error("Error logging in:", error.message);
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInTemplate
      onLogin={onLogin}
      onChangeData={onChangeData}
      formdata={formdata}
      loading={loading}
      errors={errors}
    />
  );
}

export default Login;
