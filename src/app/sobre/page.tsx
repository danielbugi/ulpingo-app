import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Target,
  Zap,
  Heart,
  Globe,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre o Ulpingo - Aprenda Hebraico Online Grátis',
  description:
    'Conheça o Ulpingo, a plataforma gratuita para brasileiros aprenderem hebraico com flashcards inteligentes e áudio nativo. Nossa missão e como funciona.',
  keywords: [
    'sobre ulpingo',
    'aprenda hebraico',
    'hebraico para brasileiros',
    'flashcards hebraico',
    'método de aprendizado',
    'repetição espaçada',
  ],
  openGraph: {
    title: 'Sobre o Ulpingo - Aprenda Hebraico Online Grátis',
    description:
      'Conheça o Ulpingo, a plataforma gratuita para brasileiros aprenderem hebraico com flashcards inteligentes e áudio nativo.',
  },
  alternates: {
    canonical: 'https://ulpingo.app/sobre',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Sobre o </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
              Ulpingo
            </span>
          </h1>

          <p className="text-2xl text-gray-400 mb-4">
            A forma mais eficaz de aprender hebraico online
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Heart className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Tornar o aprendizado de hebraico acessível, eficaz e divertido
                para todos os brasileiros. Seja para fazer Aliyah, conectar-se
                com a cultura israelense ou simplesmente aprender uma nova
                língua, estamos aqui para ajudar.
              </p>
            </div>
          </div>
        </div>

        {/* Why Ulpingo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Por que Ulpingo?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Método Científico
                  </h3>
                  <p className="text-gray-400">
                    Baseado em repetição espaçada (SRS), comprovadamente a forma
                    mais eficaz de memorização a longo prazo.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Feito para Brasileiros
                  </h3>
                  <p className="text-gray-400">
                    Interface em português, explicações contextualizadas e
                    vocabulário escolhido pensando na comunidade brasileira.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <Globe className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    100% Gratuito
                  </h3>
                  <p className="text-gray-400">
                    Acreditamos que educação deve ser acessível a todos. Sem
                    assinaturas, sem taxas, sem pegadinhas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Comunidade Ativa
                  </h3>
                  <p className="text-gray-400">
                    Junte-se a centenas de brasileiros aprendendo hebraico.
                    Compartilhe seu progresso e motive-se!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Como Funciona</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Escolha uma Categoria
                </h3>
                <p className="text-gray-400">
                  Selecione um tema (saudações, família, comida, etc.) e comece
                  a aprender palavras relevantes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center font-bold text-white">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Estude com Flashcards
                </h3>
                <p className="text-gray-400">
                  Veja a palavra em português, tente lembrar em hebraico, depois
                  vire o card e ouça a pronúncia nativa.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-bold text-white">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Teste com Quizzes
                </h3>
                <p className="text-gray-400">
                  Solidifique seu conhecimento com quizzes interativos e receba
                  feedback imediato.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-white">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Revise Periodicamente
                </h3>
                <p className="text-gray-400">
                  Nosso sistema inteligente agenda revisões no momento ideal
                  para máxima retenção.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para começar sua jornada?
          </h2>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-12 py-4 rounded-xl hover:scale-105 transition-transform"
          >
            Começar Agora Grátis
          </Link>
        </div>
      </div>
    </main>
  );
}
