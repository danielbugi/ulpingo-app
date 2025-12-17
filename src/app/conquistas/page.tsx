'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, Progress } from '@heroui/react';
import { Trophy, Lock, Check } from 'lucide-react';
import { getAchievements, getStreakData } from '@/lib/gamification';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

function ConquistasClient() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    const loadAchievements = () => {
      const achievementsData = getAchievements();
      const streak = getStreakData();
      setAchievements(achievementsData);
      setStreakData(streak);
    };

    loadAchievements();
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Calculate progress for locked achievements
  const getAchievementProgress = (achievement: Achievement) => {
    if (achievement.unlocked) return 100;

    // Calculate progress based on achievement type
    switch (achievement.id) {
      case 'streak_week':
        return Math.min((streakData.currentStreak / 7) * 100, 100);
      case 'streak_month':
        return Math.min((streakData.currentStreak / 30) * 100, 100);
      case 'word_master':
        // Would need to fetch from localStorage or API
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Overview */}
      <Card className="mb-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10">
        <CardBody className="p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Progresso Geral
              </h2>
              <p className="text-gray-400">
                {unlockedCount} de {totalCount} conquistas desbloqueadas
              </p>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
          <Progress
            value={completionPercentage}
            color="warning"
            size="lg"
            className="mb-2"
          />
          <div className="text-right">
            <span className="text-2xl font-bold text-yellow-400">
              {completionPercentage}%
            </span>
          </div>
        </CardBody>
      </Card>

      {/* Streak Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-xl border border-orange-500/20">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Sequência Atual</p>
                <p className="text-4xl font-bold text-orange-400">
                  {streakData.currentStreak}
                </p>
                <p className="text-gray-500 text-sm">dias consecutivos</p>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/20">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Melhor Sequência</p>
                <p className="text-4xl font-bold text-purple-400">
                  {streakData.longestStreak}
                </p>
                <p className="text-gray-500 text-sm">dias consecutivos</p>
              </div>
              <div className="text-5xl">⭐</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const progress = getAchievementProgress(achievement);
          const isLocked = !achievement.unlocked;

          return (
            <Card
              key={achievement.id}
              className={`relative overflow-hidden transition-all ${
                isLocked
                  ? 'bg-gray-900/50 backdrop-blur-xl border border-white/5 opacity-75'
                  : 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-xl border border-yellow-500/30 shadow-lg shadow-yellow-500/10'
              }`}
            >
              <CardBody className="p-6">
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{achievement.icon}</div>
                  <div>
                    {isLocked ? (
                      <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievement Info */}
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isLocked ? 'text-gray-400' : 'text-white'
                  }`}
                >
                  {achievement.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    isLocked ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {achievement.description}
                </p>

                {/* Progress Bar for Locked Achievements */}
                {isLocked && progress > 0 && (
                  <div>
                    <Progress
                      value={progress}
                      color="warning"
                      size="sm"
                      className="mb-1"
                    />
                    <p className="text-xs text-gray-500 text-right">
                      {Math.round(progress)}% completo
                    </p>
                  </div>
                )}

                {/* Unlocked Date */}
                {!isLocked && achievement.unlockedAt && (
                  <p className="text-xs text-yellow-600/80">
                    Desbloqueado em{' '}
                    {new Date(achievement.unlockedAt).toLocaleDateString(
                      'pt-BR'
                    )}
                  </p>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Share Section */}
      {unlockedCount > 0 && (
        <Card className="mt-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl border border-blue-500/20">
          <CardBody className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Compartilhe suas conquistas! 🎉
            </h3>
            <p className="text-gray-400 mb-4">
              Mostre aos seus amigos o quanto você progrediu no hebraico
            </p>
            {/* Add share buttons here in the future */}
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default function ConquistasPage() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Suas </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text">
              Conquistas
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Desbloqueie conquistas enquanto aprende hebraico
          </p>
        </div>

        {/* Client-side achievements component */}
        <ConquistasClient />
      </div>
    </main>
  );
}
