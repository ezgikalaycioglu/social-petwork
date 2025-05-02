import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import API from '../api';

export default function AuthPage() {
  const [mode, setMode] = useState('login');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

const handleAuth = async (data) => {
  const endpoint = mode === 'signup' ? '/auth/signup/' : '/auth/login/';

  try {
    const res = await API.post(endpoint, data);
    const { access, refresh } = res.data;

    // Tokenları kaydet
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    alert('Authentication successful!');
    // yönlendirme vs yapılabilir
  } catch (err) {
    console.error(err);
    alert('Authentication failed');
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <AuthForm mode={mode} onSubmit={handleAuth} />
      <p className="mt-4 text-sm text-gray-600">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button onClick={toggleMode} className="text-pink-600 underline">Sign up</button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button onClick={toggleMode} className="text-pink-600 underline">Log in</button>
          </>
        )}
      </p>
    </div>
  );
}
