'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hebrewWords = ['אבוד', 'לא נמצא', 'שגיאה', '404'];
  const portugueseWords = ['Perdido', 'Não encontrado', 'Erro', '404'];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted &&
          [0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute text-6xl opacity-5 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            >
              {hebrewWords[i % hebrewWords.length]}
            </div>
          ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 with Hebrew styling */}
        <div className="mb-8 animate-slideUp">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-8xl md:text-9xl font-bold text-gradient">
              4
            </span>
            <div className="relative">
              <span className="text-8xl md:text-9xl">🤔</span>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <span className="text-4xl">❓</span>
              </div>
            </div>
            <span className="text-8xl md:text-9xl font-bold text-gradient">
              4
            </span>
          </div>

          {/* Hebrew text */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            dir="rtl"
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            !הדף לא נמצא
          </h1>

          {/* Portuguese text */}
          <p className="text-xl md:text-2xl text-white/70 mb-2">
            Página não encontrada
          </p>
          <p className="text-lg text-white/50 mb-8">
            Parece que você se perdeu no caminho para aprender hebraico...
          </p>
        </div>

        {/* Helpful suggestions */}
        <div className="glass rounded-3xl p-8 mb-8 animate-slideUp">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <span>💡</span>
            <span>Que tal tentar:</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/"
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <div className="text-3xl mb-2 group-hover:animate-bounce">🏠</div>
              <div className="font-semibold">Página Inicial</div>
              <div className="text-sm text-white/60">Voltar ao começo</div>
            </Link>

            <Link
              href="/flashcards/1"
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <div className="text-3xl mb-2 group-hover:animate-bounce">🎴</div>
              <div className="font-semibold">Flashcards</div>
              <div className="text-sm text-white/60">Aprender vocabulário</div>
            </Link>

            <Link
              href="/quiz/1"
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <div className="text-3xl mb-2 group-hover:animate-bounce">📝</div>
              <div className="font-semibold">Quiz</div>
              <div className="text-sm text-white/60">Testar conhecimento</div>
            </Link>

            <Link
              href="/review"
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <div className="text-3xl mb-2 group-hover:animate-bounce">🔄</div>
              <div className="font-semibold">Revisar</div>
              <div className="text-sm text-white/60">Reforçar aprendizado</div>
            </Link>
          </div>
        </div>

        {/* Fun fact */}
        <div className="text-sm text-white/40 animate-slideUp">
          <p>
            💭 Você sabia? &quot;404&quot; em hebraico é simplesmente{' '}
            <span
              className="font-semibold"
              dir="rtl"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              404
            </span>
            <br />
            (Os números são os mesmos! 🎉)
          </p>
        </div>
      </div>
    </div>
  );
}
