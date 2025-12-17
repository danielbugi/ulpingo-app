'use client';

import { useSession } from 'next-auth/react';
import { Card, CardBody, Avatar, Button, Chip } from '@heroui/react';
import {
  User,
  Mail,
  Calendar,
  Trophy,
  BookOpen,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from '@/components/LoadingState';

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalWords: 0,
    totalReviews: 0,
    accuracy: 0,
    dueCount: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }

    if (status === 'authenticated') {
      loadUserStats();
    }
  }, [status, router]);

  const loadUserStats = async () => {
    try {
      // Load from API or localStorage
      const response = await fetch('/api/progress');
      if (response.ok) {
        const data = await response.json();

        const totalWords = data.progress?.length || 0;
        const correctAnswers =
          data.progress?.reduce(
            (sum: number, p: any) => sum + p.correct_count,
            0
          ) || 0;
        const totalAttempts =
          data.progress?.reduce(
            (sum: number, p: any) => sum + p.correct_count + p.incorrect_count,
            0
          ) || 0;
        const accuracy =
          totalAttempts > 0
            ? Math.round((correctAnswers / totalAttempts) * 100)
            : 0;

        // Get streak from localStorage
        const streakData = localStorage.getItem('ulpingo_streak_data');
        const streak = streakData
          ? JSON.parse(streakData)
          : { currentStreak: 0, longestStreak: 0 };

        setStats({
          totalWords,
          totalReviews: totalAttempts,
          accuracy,
          dueCount: data.dueCount || 0,
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (status === 'loading') {
    return <LoadingState />;
  }

  if (!session) {
    return null;
  }

  const userInitial =
    session.user?.name?.[0] || session.user?.email?.[0] || 'U';
  // Join date would need to be fetched from the database
  const joinDate = 'Membro ativo';

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Meu </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Perfil
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Acompanhe seu progresso e conquistas
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Profile Card */}
          <Card className="mb-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10">
            <CardBody className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl font-bold text-white shadow-2xl shadow-blue-500/30 border-4 border-white/10">
                  {userInitial.toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-white">
                      {session.user?.name || 'Usuário'}
                    </h2>
                    {session.user?.role === 'admin' && (
                      <Chip
                        color="warning"
                        variant="flat"
                        size="sm"
                        className="font-semibold"
                      >
                        Admin
                      </Chip>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{session.user?.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Membro desde {joinDate}</span>
                    </div>
                  </div>

                  <Button
                    color="primary"
                    variant="flat"
                    onClick={() => router.push('/configuracoes')}
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                  >
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {stats.totalWords}
                    </p>
                    <p className="text-sm text-gray-400">Palavras</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-xl border border-blue-500/20">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-blue-400" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {stats.totalReviews}
                    </p>
                    <p className="text-sm text-gray-400">Revisões</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-xl border border-green-500/20">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {stats.accuracy}%
                    </p>
                    <p className="text-sm text-gray-400">Precisão</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-xl border border-orange-500/20">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-8 h-8 text-orange-400" />
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">
                      {stats.currentStreak}
                    </p>
                    <p className="text-sm text-gray-400">Dias Seguidos</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              isPressable
              onPress={() => router.push('/conquistas')}
              className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all cursor-pointer"
            >
              <CardBody className="p-6 text-center">
                <div className="text-5xl mb-3">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Conquistas
                </h3>
                <p className="text-sm text-gray-400">
                  Ver todas as suas conquistas
                </p>
              </CardBody>
            </Card>

            <Card
              isPressable
              onPress={() => router.push('/review')}
              className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer"
            >
              <CardBody className="p-6 text-center">
                <div className="text-5xl mb-3">📝</div>
                <h3 className="text-xl font-bold text-white mb-2">Revisar</h3>
                <p className="text-sm text-gray-400">
                  {stats.dueCount > 0
                    ? `${stats.dueCount} palavras aguardando`
                    : 'Nenhuma palavra para revisar'}
                </p>
              </CardBody>
            </Card>

            <Card
              isPressable
              onPress={() => router.push('/')}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer"
            >
              <CardBody className="p-6 text-center">
                <div className="text-5xl mb-3">📚</div>
                <h3 className="text-xl font-bold text-white mb-2">Estudar</h3>
                <p className="text-sm text-gray-400">Continuar aprendendo</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
