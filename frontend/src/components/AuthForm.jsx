import { useState } from "react";

export default function AuthForm({ mode = "login", onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const title = mode === "signup" ? "Sign Up" : "Log In";

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };
    if (mode === "signup") {
      data.email = email;
    }

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
        placeholder="Username"
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      {mode === "signup" && (
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      )}

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
