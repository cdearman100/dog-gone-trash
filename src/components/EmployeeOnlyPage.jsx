import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const EmployeeOnlyPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || !user.employee) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Access Denied</h2>
        <p>You must be logged in as an employee to view this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
      <p>Welcome, {user.name}! Here is your employee-only content.</p>
    </div>
  );
};

export default EmployeeOnlyPage;
