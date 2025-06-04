"use client";
import { LoginForm } from "@siavanna/atomic-lib";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("https://chat.savannagrace.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status && data.status.token) {
          localStorage.setItem("authToken", data.status.token);
          router.push("/chat");
        } else {
          setError("Error fetching token");
        }
      } else {
        if (data && data.error) {
          setError(data.error);
        } else if (data && data.status && data.status.message) {
          setError(data.status.message);
        } else {
          setError("Invalid email or password");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("An error occurred while logging in");
    }
  };

  const formFields = {
    email: {
      value: email,
      onChange: (event: any) => setEmail(event.target.value),
      placeholder: "Email",
    },
    password: {
      value: password,
      onChange: (event: any) => setPassword(event.target.value),
      placeholder: "Password",
    },
  };

  const formActions = {
    children: "Login",
    onClick: handleSubmit,
    disabled: false,
  };

  return (
    <div className="container">
      <LoginForm formFields={formFields} formActions={formActions} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Login;
