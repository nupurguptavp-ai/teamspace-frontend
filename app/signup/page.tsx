'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !name) {
      setError('All fields are required');
      return;
    }
  
    try {
      setLoading(true);
      setError('');
  
      // Step 1: Signup
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        password,
        name,
      });
  
      // Step 2: Auto-login to get token
      const loginRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
  
      const token = loginRes.data.token ?? loginRes.data.access_token;
  
      if (!token) {
        setError('Login after signup failed');
        return;
      }
  
      // Step 3: Store token
      localStorage.setItem('token', token);
  
      // Step 4: Redirect
      router.push('/chat');
  
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      
      <div className="w-[400px] bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Join Teamspace and start collaborating
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-slate-700 text-white outline-none"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-slate-700 text-white outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white outline-none"
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/')}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}