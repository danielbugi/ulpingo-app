'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@heroui/react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-orange-900/20"></div>

          <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Algo deu errado
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Desculpe, encontramos um erro inesperado.
              <br />
              Tente recarregar a página ou voltar ao início.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-8 text-left">
                <p className="text-red-400 font-mono text-sm">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold"
                startContent={<RefreshCcw className="w-5 h-5" />}
                onClick={() => window.location.reload()}
              >
                Recarregar Página
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                  startContent={<Home className="w-5 h-5" />}
                >
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
