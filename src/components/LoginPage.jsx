import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { loginUser, createUser } from '../api/usersApi';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isLogin) {
      try {
        const credentials = { email, password };
        const userData = await loginUser(credentials);
  
        // Save the token in localStorage
        localStorage.setItem('token', userData.token);
  
        // Log the token for debugging
        console.log("Token saved to localStorage:", userData.token);
  
        // Log the user in on success
        login(userData);
        alert('Login successful!');
      } catch (err) {
        console.error("Login error:", err);
        alert(err.detail || 'Login failed. Please check your credentials.');
      }
    } else {
      try {
        const newUser = {
          email,
          password,
          full_name: fullName,
          reward_points: 0,
        };
        await createUser(newUser);
        alert('Account created successfully. You can now log in.');
        setIsLogin(true);
      } catch (error) {
        console.error('Error creating account:', error);
        alert('Failed to create account. Please try again.');
      }
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Welcome Back' : 'Join Dog Gone Trash'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded"
            required={!isLogin}
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <div className="text-center mt-4">
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
