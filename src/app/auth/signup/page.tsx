'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { StyledInput } from '@/components/StyledInput';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao criar conta');
        setIsLoading(false);
        return;
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          'Conta criada, mas erro ao fazer login. Tente fazer login manualmente.'
        );
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      setError('Algo deu errado. Por favor, tente novamente.');
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
        setError('Erro ao autenticar com Google. Tente novamente.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('OAuth error:', error);
      setError('Erro ao conectar. Tente novamente.');
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
            Junte-se ao Ulpingo
          </h1>
          <p className="text-gray-400 text-center">
            Comece sua jornada no aprendizado de Hebraico
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
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                Conta criada com sucesso! Redirecionando...
              </div>
            )}

            <div>
              <p className="text-white font-medium mb-2">Nome</p>
              <StyledInput
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                startContent={<User className="w-4 h-4 text-gray-400" />}
                isRequired
              />
            </div>

            <div>
              <p className="text-white font-medium mb-2">Email</p>
              <StyledInput
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<Mail className="w-4 h-4 text-gray-400" />}
                isRequired
              />
            </div>

            <div>
              <p className="text-white font-medium mb-2">Senha</p>
              <StyledInput
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                isRequired
              />
            </div>

            <div>
              <p className="text-white font-medium mb-2">Confirmar Senha</p>
              <StyledInput
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                isRequired
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
              isLoading={isLoading}
              startContent={!isLoading && <User className="w-4 h-4" />}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Já tem uma conta?{' '}
              <Link
                href="/auth/signin"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Entre aqui
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
