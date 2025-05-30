'use client';
import { LoginForm } from "@siavanna/atomic-lib";

export default function Login() {
  return (
    <div className="container">
      <LoginForm
        formFields={{
          email: {
            value: "",
            onChange: () => {},
            placeholder: "Email",
          },
          password: {
            value: "",
            onChange: () => {},
            placeholder: "Password",
          },
        }}
        formActions={{
          children: "Login",
          disabled: false,
        }}
      />
    </div>
  );
}