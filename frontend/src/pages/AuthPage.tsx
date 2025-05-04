import { useState } from "react";
import AuthForm from "../components/AuthForm.js";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthCredentials, AuthResponse } from "../types";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const navigate = useNavigate();

  const handleAuth = async (data: AuthCredentials) => {
    const endpoint = mode === "signup" ? "/auth/signup/" : "/auth/login/";

    try {
      const res = await API.post<AuthResponse>(endpoint, data);
      const { access, refresh } = res.data;
      login(access);
      localStorage.setItem("refreshToken", refresh);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <AuthForm mode={mode} onSubmit={handleAuth} />
      <p className="mt-4 text-sm text-gray-600">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button onClick={toggleMode} className="text-pink-600 underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={toggleMode} className="text-pink-600 underline">
              Log in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
