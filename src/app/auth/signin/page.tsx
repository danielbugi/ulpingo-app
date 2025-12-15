'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { StyledInput } from '@/components/StyledInput';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google') => {
    try {
      setIsLoading(true);
      setError('');
      const result = await signIn(provider, { callbackUrl: '/' });
      if (result?.error) {
        setError('Failed to authenticate with Google. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('OAuth error:', error);
      setError('Connection error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <Card className="w-full max-w-md relative glass">
        <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
          <div className="text-6xl mb-2">🇮🇱</div>
          <h1 className="text-3xl font-bold text-gradient">
            Bem-vindo ao Ulpingo
          </h1>
          <p className="text-gray-400 text-center">
            Entre para continuar aprendendo Hebraico
          </p>
        </CardHeader>

        <CardBody className="gap-4 pb-8">
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              variant="flat"
              className="w-full bg-white text-black font-medium hover:bg-gray-100"
              startContent={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
              onClick={() => handleOAuthSignIn('google')}
              isDisabled={isLoading}
            >
              Continuar com Google
            </Button>
          </div>

          <div className="flex items-center gap-4 my-2">
            <Divider className="flex-1" />
            <span className="text-sm text-gray-500">ou</span>
            <Divider className="flex-1" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <p className="text-white font-medium mb-2">Email</p>
              <StyledInput
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // startContent={<Mail className="w-4 h-4 text-gray-400" />}
                isRequired
              />
            </div>

            <div>
              <p className="text-white font-medium mb-2">Senha</p>
              <StyledInput
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // startContent={<Lock className="w-4 h-4 text-gray-400" />}
                isRequired
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
              isLoading={isLoading}
              startContent={!isLoading && <Mail className="w-4 h-4" />}
            >
              {isLoading ? 'Entrando...' : 'Entrar com Email'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Não tem uma conta?{' '}
              <Link
                href="/auth/signup"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
