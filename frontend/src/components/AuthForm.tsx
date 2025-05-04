import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthFormProps, AuthCredentials } from "../types";

export default function AuthForm({ mode = "login", onSubmit }: AuthFormProps) {
  const [form, setForm] = useState<AuthCredentials>({
    username: "",
    password: "",
    email: "",
  });

  const title = mode === "signup" ? "Sign Up" : "Log In";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: AuthCredentials = {
      ...form,
    };
    if (mode === "login") delete data.email;

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        value={form.username}
        onChange={handleChange}
        required
      />

      {mode === "signup" && (
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-pink-600 text-black py-2 rounded hover:bg-pink-700 transition"
      >
        {title}
      </button>
    </form>
  );
}
