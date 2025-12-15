'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background with broken pieces effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-5 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          >
            {['⚠️', '🔧', '❌', '💔', '🛠️', '⚡', '🔄'][i]}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Error icon with animation */}
        <div className="mb-8 animate-slideUp">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative animate-wiggle">
              <span className="text-8xl">⚠️</span>
              <div className="absolute inset-0 blur-xl opacity-50 bg-red-500 animate-pulse"></div>
            </div>
          </div>

          {/* Hebrew text */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-red-400"
            dir="rtl"
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            !אופס, משהו השתבש
          </h1>

          {/* Portuguese text */}
          <p className="text-xl md:text-2xl text-white/70 mb-2">
            Ops! Algo deu errado
          </p>
          <p className="text-lg text-white/50 mb-8">
            Não se preocupe, até os melhores alunos cometem erros.
            <br />
            Vamos tentar de novo? 💪
          </p>
        </div>

        {/* Error details (only show in development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="glass rounded-2xl p-6 mb-8 text-left animate-slideUp border border-red-500/20">
            <h3 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
              <span>🐛</span>
              <span>Detalhes do Erro (Dev Mode):</span>
            </h3>
            <pre className="text-xs text-white/60 overflow-x-auto p-4 bg-black/30 rounded-lg">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-white/40 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slideUp">
          <button
            onClick={reset}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              <span>🔄</span>
              <span>Tentar Novamente</span>
            </span>
          </button>

          <Link
            href="/"
            className="group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 overflow-hidden glass border border-white/20"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              <span>🏠</span>
              <span>Voltar ao Início</span>
            </span>
          </Link>
        </div>

        {/* Helpful tips */}
        <div className="glass rounded-3xl p-8 animate-slideUp border border-white/10">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
            <span>💡</span>
            <span>Enquanto isso, que tal:</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-2xl mb-2">📖</div>
              <div className="font-semibold mb-1">Revisar palavras</div>
              <div className="text-white/60">Continue aprendendo</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-2xl mb-2">☕</div>
              <div className="font-semibold mb-1">Fazer uma pausa</div>
              <div className="text-white/60">Relaxar um pouco</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="text-2xl mb-2">🔊</div>
              <div className="font-semibold mb-1">Praticar pronúncia</div>
              <div className="text-white/60">Ouvir as palavras</div>
            </div>
          </div>
        </div>

        {/* Encouraging message */}
        <div className="mt-8 text-sm text-white/40 animate-slideUp">
          <p>
            <span
              dir="rtl"
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              !לא נורא, ממשיכים
            </span>
            <br />
            (Não tem problema, vamos continuar!)
          </p>
        </div>
      </div>
    </div>
  );
}
