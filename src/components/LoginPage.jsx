import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      name: isLogin ? 'Community Member' : name,
      credits: 1245,
      pickupsCompleted: 12,
      communityImpact: 37,
    };
    login(userData);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
