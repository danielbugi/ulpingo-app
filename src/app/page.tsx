import Link from 'next/link';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { BookOpen, Gamepad2, Trophy, Sparkles, Zap, Star } from 'lucide-react';
import { getCategories, getProgress } from '@/lib/db';

export default function Home() {
  const categories = getCategories();
  const progress = getProgress();

  const totalWords = progress.length;
  const correctAnswers = progress.reduce((sum, p) => sum + p.correct_count, 0);
  const totalAttempts = progress.reduce(
    (sum, p) => sum + p.correct_count + p.incorrect_count,
    0
  );
  const accuracy =
    totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex justify-between items-center mb-12 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Ulpingo</h1>
          </div>

          <div className="flex gap-2">
            <Button variant="light" className="text-gray-300">
              Sobre
            </Button>
            <Button variant="light" className="text-gray-300">
              Contato
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16 py-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">100% Gratuito</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-white">Aprenda </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
              Hebraico
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 mb-4 font-light">
            עברית לברזילאים
          </p>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            A forma mais divertida e eficaz de aprender hebraico.
            <br />
            Flashcards interativos, quizzes desafiadores e{' '}
            <span className="text-purple-400">🔊 áudio com pronúncia</span>!
          </p>

          {totalAttempts > 0 && (
            <div className="flex justify-center gap-4 flex-wrap max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 min-w-[150px]">
                <div className="text-4xl font-bold text-purple-400 mb-1">
                  {totalWords}
                </div>
                <div className="text-sm text-gray-400">Palavras</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 min-w-[150px]">
                <div className="text-4xl font-bold text-cyan-400 mb-1">
                  {totalAttempts}
                </div>
                <div className="text-sm text-gray-400">Tentativas</div>
              </div>
              <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-6 min-w-[150px]">
                <div className="text-4xl font-bold text-pink-400 mb-1">
                  {accuracy}%
                </div>
                <div className="text-sm text-gray-400">Acertos</div>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Escolha uma Categoria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative"
                style={{
                  animation: 'slideUp 0.6s ease-out',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'backwards',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name_pt}
                  </h3>

                  <p className="text-xl text-gray-400 mb-6" dir="rtl">
                    {category.name_he}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/flashcards/${category.id}`}
                      className="flex-1"
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
                        startContent={<BookOpen className="w-4 h-4" />}
                      >
                        Cards
                      </Button>
                    </Link>
                    <Link href={`/quiz/${category.id}`} className="flex-1">
                      <Button
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all"
                        startContent={<Gamepad2 className="w-4 h-4" />}
                      >
                        Quiz
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pratique Todas as Categorias
            </h3>
            <p className="text-gray-400 mb-8">
              Teste seu conhecimento com todas as 60 palavras de uma vez
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/flashcards/all">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg px-8 hover:from-purple-500 hover:to-pink-500"
                  startContent={<BookOpen className="w-5 h-5" />}
                >
                  Todos os Flashcards
                </Button>
              </Link>
              <Link href="/quiz/all">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-lg px-8 hover:from-cyan-500 hover:to-blue-500"
                  startContent={<Trophy className="w-5 h-5" />}
                >
                  Quiz Completo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 border-t border-gray-800">
          <p className="mb-2">
            Feito com ❤️ para novos imigrantes brasileiros em Israel
          </p>
          <p className="text-sm">בהצלחה! Boa sorte nos estudos!</p>
        </footer>
      </div>
    </main>
  );
}
