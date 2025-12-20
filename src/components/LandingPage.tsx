// src/components/LandingPage.tsx
'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import { BookOpen, Gamepad2, Brain, Sparkles, Star, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-16">
            <div className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ulpingo
              </span>
            </div>
            <div className="flex gap-4">
              <Link href="/auth/signin">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm">
                Aprenda Hebraico de forma divertida
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Aprenda{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Hebraico
              </span>
              <br />
              em Português
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              A primeira plataforma de aprendizado de Hebraico feita
              especialmente para falantes de Português Brasileiro. Flashcards,
              quizzes e repetição espaçada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-8 py-6 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/25"
                  startContent={<Sparkles className="w-5 h-5" />}
                >
                  Comece Gratis
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-gray-600 text-gray-300 font-semibold text-lg px-8 py-6 hover:bg-gray-800/50"
                >
                  Ja tenho conta
                </Button>
              </Link>
            </div>

            {/* Hebrew Preview */}
            <div className="mt-16 flex justify-center gap-8 text-4xl" dir="rtl">
              <span className="text-purple-300 opacity-60">שָׁלוֹם</span>
              <span className="text-pink-300 opacity-80">תּוֹדָה</span>
              <span className="text-cyan-300 opacity-60">בְּבַקָּשָׁה</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Por que escolher o Ulpingo?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Metodos cientificos de aprendizado adaptados para brasileiros
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Flashcards Interativos
              </h3>
              <p className="text-gray-400">
                Aprenda vocabulario com cartoes de memoria que incluem pronuncia
                e transliteracao.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-pink-500/50 transition-all">
              <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Repeticao Espacada
              </h3>
              <p className="text-gray-400">
                Sistema SM-2 que otimiza suas revisoes para maxima retencao de
                longo prazo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <Gamepad2 className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Quizzes Divertidos
              </h3>
              <p className="text-gray-400">
                Teste seu conhecimento com quizzes de multipla escolha e ganhe
                pontos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                140+
              </div>
              <div className="text-gray-400">Palavras</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">14</div>
              <div className="text-gray-400">Categorias</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-gray-400">Gratuito</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                PT-BR
              </div>
              <div className="text-gray-400">Nativo</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para comecar?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Crie sua conta gratuita e comece a aprender hebraico hoje mesmo.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-10 py-6 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/25"
              startContent={<Star className="w-5 h-5" />}
            >
              Criar Conta Gratuita
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            2024 Ulpingo. Feito com amor para brasileiros que querem aprender
            hebraico.
          </p>
        </div>
      </footer>
    </div>
  );
}
