// src/lib/auth-options.ts
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getPool } from '@/lib/db-pool';
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const pool = getPool();
          const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND provider = $2',
            [credentials.email, 'email']
          );

          const user = result.rows[0];

          if (!user || !user.password_hash) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            provider: user.provider,
            role: user.role || 'user',
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        const pool = getPool();
        const existingUser = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [user.email]
        );

        if (existingUser.rows.length === 0) {
          await pool.query(
            `INSERT INTO users (email, name, image, provider, provider_account_id, email_verified, role) 
             VALUES ($1, $2, $3, $4, $5, NOW(), $6)`,
            [
              user.email,
              user.name,
              user.image,
              account?.provider || 'email',
              account?.providerAccountId || null,
              'user',
            ]
          );

          const newUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [user.email]
          );

          await pool.query('INSERT INTO user_stats (user_id) VALUES ($1)', [
            newUser.rows[0].id,
          ]);
        }

        return true;
      } catch (error) {
        console.error('SignIn error:', error);
        return false;
      }
    },
    async jwt({ token, user, trigger, account }) {
      // On sign in, fetch user data from database
      if (user) {
        token.id = user.id;
        
        // Fetch role from database
        try {
          const pool = getPool();
          const result = await pool.query(
            'SELECT id, email, role FROM users WHERE id = $1',
            [user.id]
          );
          if (result.rows[0]) {
            token.role = result.rows[0].role || 'user';
            token.email = result.rows[0].email;
          } else {
            token.role = 'user';
          }
        } catch (error) {
          console.error('Error fetching user data in JWT:', error);
          token.role = 'user';
        }
      }

      // Refresh role if needed
      if (trigger === 'update' && token.id) {
        try {
          const pool = getPool();
          const result = await pool.query(
            'SELECT role FROM users WHERE id = $1',
            [token.id]
          );
          if (result.rows[0]) {
            token.role = result.rows[0].role;
          }
        } catch (error) {
          console.error('Error updating user role:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'admin';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
