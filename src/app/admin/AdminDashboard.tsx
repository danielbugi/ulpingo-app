'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Users,
  BookOpen,
  FolderOpen,
  TrendingUp,
  Shield,
  RefreshCw,
  Calendar,
  Activity,
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalWords: number;
  totalCategories: number;
  activeUsers: number;
  adminCount: number;
  userCount: number;
  totalProgress: number;
  avgProgressPerUser: number;
  recentUsers: Array<{
    id: number;
    email: string;
    name: string | null;
    role: string;
    created_at: string;
    provider: string;
  }>;
  recentActivity: Array<{
    user_email: string;
    activity_count: number;
    last_activity: string;
  }>;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: number, newRole: 'user' | 'admin') => {
    try {
      const response = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // Refresh stats
      await fetchStats();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-purple-500 mx-auto animate-spin" />
          <p className="mt-4 text-gray-400 font-medium">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="card-gradient p-8 rounded-xl max-w-md border border-red-500/20">
          <h2 className="text-xl font-bold text-red-400 mb-2">⚠️ Error</h2>
          <p className="text-gray-300">{error || 'Failed to load dashboard'}</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl font-bold text-gradient">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-gray-400">
              Welcome back,{' '}
              <span className="text-purple-400 font-medium">
                {session?.user?.name || session?.user?.email}
              </span>
            </p>
          </div>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors flex items-center gap-2 border border-purple-500/30"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-gradient p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-xs text-gray-400 bg-blue-500/10 px-2 py-1 rounded">
                Total
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {stats.totalUsers}
            </div>
            <div className="text-gray-400 text-sm">Total Users</div>
          </div>

          <div className="card-gradient p-6 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-green-400" />
              <span className="text-xs text-gray-400 bg-green-500/10 px-2 py-1 rounded">
                Content
              </span>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">
              {stats.totalWords}
            </div>
            <div className="text-gray-400 text-sm">Total Words</div>
          </div>

          <div className="card-gradient p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <FolderOpen className="w-8 h-8 text-yellow-400" />
              <span className="text-xs text-gray-400 bg-yellow-500/10 px-2 py-1 rounded">
                Categories
              </span>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {stats.totalCategories}
            </div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>

          <div className="card-gradient p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-xs text-gray-400 bg-purple-500/10 px-2 py-1 rounded">
                7 Days
              </span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {stats.activeUsers}
            </div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card-gradient p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Shield className="w-4 h-4 text-purple-400" />
              Admins
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {stats.adminCount || 0}
            </div>
          </div>
          <div className="card-gradient p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Users className="w-4 h-4 text-blue-400" />
              Regular Users
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {stats.userCount || 0}
            </div>
          </div>
          <div className="card-gradient p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Total Progress
            </div>
            <div className="text-2xl font-bold text-green-400">
              {stats.totalProgress || 0}
            </div>
          </div>
          <div className="card-gradient p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Avg Progress/User
            </div>
            <div className="text-2xl font-bold text-cyan-400">
              {stats.avgProgressPerUser || 0}
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Users Table */}
          <div className="card-gradient p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">Recent Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-gray-400 text-sm font-semibold">
                      Email
                    </th>
                    <th className="text-left py-2 px-3 text-gray-400 text-sm font-semibold">
                      Role
                    </th>
                    <th className="text-left py-2 px-3 text-gray-400 text-sm font-semibold">
                      Provider
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.slice(0, 10).map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-2 px-3 text-sm">
                        <div className="truncate max-w-[200px]">
                          {user.email}
                        </div>
                        {user.name && (
                          <div className="text-xs text-gray-500">
                            {user.name}
                          </div>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-400">
                        {user.provider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="card-gradient p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-gray-400 text-sm font-semibold">
                      User
                    </th>
                    <th className="text-left py-2 px-3 text-gray-400 text-sm font-semibold">
                      Actions
                    </th>
                    <th className="text-left py-2 px-3 text-gray-400 text-sm font-semibold">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentActivity && stats.recentActivity.length > 0 ? (
                    stats.recentActivity.slice(0, 10).map((activity, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-2 px-3 text-sm truncate max-w-[200px]">
                          {activity.user_email}
                        </td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-semibold">
                            {activity.activity_count}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-xs text-gray-400">
                          {new Date(
                            activity.last_activity
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-4 px-3 text-center text-gray-500"
                      >
                        No recent activity
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="card-gradient p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Created
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-300">{user.id}</td>
                    <td className="py-3 px-4 text-gray-200">{user.email}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {user.name || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      {user.id !== parseInt(session?.user?.id || '0') ? (
                        <button
                          onClick={() =>
                            updateUserRole(
                              user.id,
                              user.role === 'admin' ? 'user' : 'admin'
                            )
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            user.role === 'admin'
                              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30'
                              : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {user.role === 'admin'
                            ? 'Remove Admin'
                            : 'Make Admin'}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500 italic">
                          You (cannot edit)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
