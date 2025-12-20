// src/app/app/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getCategories } from '@/lib/db-new';
import { getDueCount } from '@/lib/db-new';
import { getUserStats } from '@/lib/db-level-system';
import { getLevelProgress } from '@/lib/level-system';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { BookOpen, Gamepad2, Sparkles, Brain } from 'lucide-react';
import LevelDisplay from '@/components/LevelDisplay';

export default async function AppPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const userId = parseInt(session.user.id);
  const categories = await getCategories();

  // Get words due for review
  const dueCount = await getDueCount(userId);

  // Get level progress
  let levelProgress = null;
  const stats = await getUserStats(userId);
  if (stats) {
    levelProgress = getLevelProgress(stats.totalXp || 0);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Shalom, {session.user.name?.split(' ')[0] || 'Estudante'}!
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Continue sua jornada no hebraico
          </p>
        </div>

        {/* Level Display */}
        {levelProgress && (
          <div className="max-w-md mx-auto mb-12">
            <LevelDisplay progress={levelProgress} />
          </div>
        )}

        {/* Review Reminder */}
        {dueCount > 0 && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {dueCount} {dueCount === 1 ? 'palavra' : 'palavras'} para
                      revisar hoje
                    </p>
                    <p className="text-gray-500 text-sm">
                      Revisoes espacadas ajudam voce a lembrar por mais tempo!
                    </p>
                  </div>
                </div>
                <Link href="/review">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:from-blue-500 hover:to-cyan-500"
                    startContent={<Sparkles className="w-5 h-5" />}
                  >
                    Revisar Agora
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Escolha uma Categoria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group relative animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
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
      </div>
    </main>
  );
}
