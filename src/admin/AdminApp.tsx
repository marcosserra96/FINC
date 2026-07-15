import { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { isAdminAuthenticated } from '@/services/adminAuth';

export function AdminApp() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthenticated(false)} />;
}
