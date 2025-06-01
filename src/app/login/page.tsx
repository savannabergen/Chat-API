"use client";
import { LoginForm } from "@siavanna/atomic-lib";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../utils/apiClient";

const Login = () => {
  const router = useRouter();
  const [formFields, setFormFields] = useState({
    email: {
      value: "",
      onChange: (event: any) => {
        setFormFields((prevFormFields) => ({
          ...prevFormFields,
          email: { ...prevFormFields.email, value: event.target.value },
        }));
      },
      placeholder: "Email",
    },
    password: {
      value: "",
      onChange: (event: any) => {
        setFormFields((prevFormFields) => ({
          ...prevFormFields,
          password: { ...prevFormFields.password, value: event.target.value },
        }));
      },
      placeholder: "Password",
    },
  });

  const [loginStatus, setLoginStatus] = useState({
    success: false,
    error: null as string | null,
  });

  const handleSubmit = async () => {
    try {
      const response = await login(
        formFields.email.value,
        formFields.password.value,
      );
      if (response && response.headers && response.headers["authorization"]) {
        const token = response.headers["authorization"];
        localStorage.setItem("authToken", token);
        setLoginStatus({ success: true, error: null });
        router.push("/dashboard");
      } else {
        setLoginStatus({
          success: false,
          error: "Invalid response from server",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setLoginStatus({ success: false, error: "Invalid email or password" });
      } else {
        setLoginStatus({
          success: false,
          error: "An error occurred while logging in",
        });
      }
      console.error("API Error:", error);
    }
  };

  const formActions = {
    children: "Login",
    onClick: handleSubmit,
    disabled: false,
  };

  return (
    <div className="container">
      <LoginForm formFields={formFields} formActions={formActions} />
      {loginStatus.success && (
        <div style={{ color: "green" }}>Login successful!</div>
      )}
      {loginStatus.error && (
        <div style={{ color: "red" }}>{loginStatus.error}</div>
      )}
    </div>
  );
};

export default Login;
