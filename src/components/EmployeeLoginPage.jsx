import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';

const EmployeeLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd verify these credentials via an API
    if (email === 'employee@example.com' && password === 'secret123') {
      const userData = {
        email,
        name: 'Employee User',
        employee: true,
        credits: 500,
        pickupsCompleted: 0,
        communityImpact: 0
      };
      login(userData);
    } else {
      alert('Invalid employee credentials');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EmployeeLoginPage;
