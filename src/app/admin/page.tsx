// src/app/admin/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import AdminDashboard from './AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Ulpingo Admin Dashboard',
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in or not an admin
  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  return <AdminDashboard />;
}
