// src/app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getPool } from '@/lib/db-pool';

export async function GET() {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const pool = getPool();

    // Get total users
    const totalUsersResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE id IS NOT NULL'
    );
    const totalUsers = parseInt(totalUsersResult.rows[0].count);

    // Get admin count
    const adminCountResult = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'admin'"
    );
    const adminCount = parseInt(adminCountResult.rows[0].count);

    // Get regular user count
    const userCountResult = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'user'"
    );
    const userCount = parseInt(userCountResult.rows[0].count);

    // Get total words
    const totalWordsResult = await pool.query(
      'SELECT COUNT(*) as count FROM words'
    );
    const totalWords = parseInt(totalWordsResult.rows[0].count);

    // Get total categories
    const totalCategoriesResult = await pool.query(
      'SELECT COUNT(*) as count FROM categories'
    );
    const totalCategories = parseInt(totalCategoriesResult.rows[0].count);

    // Get active users in last 7 days
    const activeUsersResult = await pool.query(
      `SELECT COUNT(DISTINCT user_id) as count 
       FROM user_progress 
       WHERE last_reviewed > NOW() - INTERVAL '7 days'`
    );
    const activeUsers = parseInt(activeUsersResult.rows[0].count);

    // Get total progress entries
    const totalProgressResult = await pool.query(
      'SELECT COUNT(*) as count FROM user_progress'
    );
    const totalProgress = parseInt(totalProgressResult.rows[0].count);

    // Calculate average progress per user
    const avgProgressPerUser =
      totalUsers > 0 ? Math.round(totalProgress / totalUsers) : 0;

    // Get recent users
    const recentUsersResult = await pool.query(
      `SELECT id, email, name, role, provider, created_at 
       FROM users 
       WHERE id IS NOT NULL
       ORDER BY created_at DESC 
       LIMIT 30`
    );

    // Get recent activity
    const recentActivityResult = await pool.query(
      `SELECT 
         u.email as user_email,
         COUNT(up.id) as activity_count,
         MAX(up.last_reviewed) as last_activity
       FROM user_progress up
       JOIN users u ON u.id = up.user_id
       WHERE up.last_reviewed IS NOT NULL
       GROUP BY u.email
       ORDER BY last_activity DESC
       LIMIT 15`
    );

    return NextResponse.json({
      totalUsers,
      adminCount,
      userCount,
      totalWords,
      totalCategories,
      activeUsers,
      totalProgress,
      avgProgressPerUser,
      recentUsers: recentUsersResult.rows,
      recentActivity: recentActivityResult.rows,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
