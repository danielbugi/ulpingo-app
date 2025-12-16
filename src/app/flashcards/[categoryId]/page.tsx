'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Chip, Progress } from '@heroui/react';
import {
  ArrowLeft,
  RotateCcw,
  Home,
  Trophy,
  TrendingUp,
  XCircle,
  Flame,
  Volume2,
  VolumeX,
  Target,
} from 'lucide-react';
import FlashCard from '@/components/FlashCard';
import PageLoader from '@/components/PageLoader';
import AchievementToast from '@/components/AchievementToast';
import { useUserId } from '@/lib/hooks/useUserId';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcut';
import {
  playSuccess,
  playError,
  playComplete,
  playClick,
  toggleSound,
  isSoundEnabled,
} from '@/lib/sound-effects';
import {
  updateStreak,
  getStreakData,
  checkAchievements,
  getDailyGoal,
  updateDailyGoal,
} from '@/lib/gamification';
import { saveGuestProgress, updateGuestStats } from '@/lib/guest-session';
import { useSession } from 'next-auth/react';

interface Word {
  id: number;
  word_pt: string;
  word_he: string;
  transliteration: string;
}

export default function FlashcardsPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  const { data: session } = useSession();
  const userId = useUserId();

  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ known: 0, unknown: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // New gamification state
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streakData, setStreakData] = useState(getStreakData());
  const [dailyGoal, setDailyGoal] = useState(getDailyGoal());

  // Initialize sound state
  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '1',
      callback: () => {
        if (!isComplete && words[currentIndex]) {
          handleKnow();
        }
      },
    },
    {
      key: '2',
      callback: () => {
        if (!isComplete && words[currentIndex]) {
          handleDontKnow();
        }
      },
    },
    {
      key: 'r',
      callback: () => {
        if (isComplete) {
          restart();
        }
      },
    },
    {
      key: 'Escape',
      callback: () => {
        playClick();
        router.push('/');
      },
    },
  ]);

  // Play completion sound
  useEffect(() => {
    if (isComplete) {
      playComplete();
    }
  }, [isComplete]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/words/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data.words);
        setCategoryName(data.categoryName);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading words:', error);
        setIsLoading(false);
      });
  }, [categoryId]);

  const handleKnow = async () => {
    if (words[currentIndex]) {
      // Play success sound
      playSuccess();

      const body: any = {
        wordId: words[currentIndex].id,
        isCorrect: true,
      };

      if (typeof userId === 'string') {
        body.guestId = userId;
      }

      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Update guest stats if not authenticated
      if (!session?.user) {
        updateGuestStats(true);
      }

      // Update stats
      const newStats = { ...stats, known: stats.known + 1 };
      setStats(newStats);

      // Update streak
      const newStreak = updateStreak();
      setStreakData(newStreak);

      // Update daily goal
      const newDailyGoal = updateDailyGoal(1);
      setDailyGoal(newDailyGoal);

      // Check for achievements
      const totalWords = newStats.known + newStats.unknown;
      const newAchievements = checkAchievements({
        wordsLearned: totalWords,
        currentStreak: newStreak.currentStreak,
      });

      // Show first new achievement
      if (newAchievements.length > 0) {
        setCurrentAchievement(newAchievements[0]);
      }

      nextCard();
    }
  };

  const handleDontKnow = async () => {
    if (words[currentIndex]) {
      // Play error sound
      playError();

      const body: any = {
        wordId: words[currentIndex].id,
        isCorrect: false,
      };

      if (typeof userId === 'string') {
        body.guestId = userId;
      }

      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Update guest stats if not authenticated
      if (!session?.user) {
        updateGuestStats(false);
      }

      // Update stats
      const newStats = { ...stats, unknown: stats.unknown + 1 };
      setStats(newStats);

      // Update daily goal (attempted word)
      const newDailyGoal = updateDailyGoal(1);
      setDailyGoal(newDailyGoal);

      nextCard();
    }
  };

  const nextCard = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const restart = () => {
    playClick();
    setCurrentIndex(0);
    setStats({ known: 0, unknown: 0 });
    setIsComplete(false);
  };

  const handleSoundToggle = () => {
    const enabled = toggleSound();
    setSoundEnabled(enabled);
    playClick();
  };

  if (isLoading) {
    return <PageLoader message="Carregando flashcards..." color="purple" />;
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">
            😕 Nenhuma palavra encontrada
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
            startContent={<Home />}
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            isIconOnly
            variant="light"
            onClick={() => {
              playClick();
              router.push('/');
            }}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-1">
              {categoryName}
            </h1>
            <p className="text-purple-400 font-semibold">Flashcards</p>
          </div>

          <div className="flex gap-2">
            <Button
              isIconOnly
              variant="light"
              onClick={handleSoundToggle}
              className="text-white hover:bg-white/10"
            >
              {soundEnabled ? (
                <Volume2 className="w-6 h-6" />
              ) : (
                <VolumeX className="w-6 h-6" />
              )}
            </Button>
            <Button
              isIconOnly
              variant="light"
              onClick={restart}
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mb-8 space-y-4">
          {/* Streak and Daily Goal */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white font-bold text-lg">
                    {streakData.currentStreak} dias
                  </p>
                  <p className="text-white/60 text-xs">Sequência 🔥</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">
                    {dailyGoal.completed}/{dailyGoal.target}
                  </p>
                  <Progress
                    value={(dailyGoal.completed / dailyGoal.target) * 100}
                    size="sm"
                    color="success"
                    className="max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Progresso</span>
              <span className="text-purple-400 font-bold">
                {currentIndex + 1} / {words.length}
              </span>
            </div>
            <Progress
              value={((currentIndex + 1) / words.length) * 100}
              className="h-2"
              classNames={{
                indicator: 'bg-gradient-to-r from-purple-500 to-pink-500',
              }}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold text-2xl">
                  {stats.known}
                </span>
                <span className="text-gray-400 text-sm">acertos</span>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold text-2xl">
                  {stats.unknown}
                </span>
                <span className="text-gray-400 text-sm">erros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flashcard or Completion */}
        {!isComplete ? (
          <FlashCard
            wordPt={words[currentIndex].word_pt}
            wordHe={words[currentIndex].word_he}
            transliteration={words[currentIndex].transliteration}
            onKnow={handleKnow}
            onDontKnow={handleDontKnow}
            cardNumber={currentIndex + 1}
            totalCards={words.length}
          />
        ) : (
          <div className="mb-4 text-center text-white/40 text-sm">
            💡 Dica: Use teclas 1 = Conheço | 2 = Não conheço | R = Reiniciar |
            Esc = Voltar
          </div>
        )}

        {isComplete && (
          <div className="text-center space-y-8 py-12">
            <div className="text-8xl animate-bounce">🎉</div>

            <h2 className="text-5xl font-bold text-white mb-4">Parabéns!</h2>

            <p className="text-xl text-gray-400">
              Você completou todos os flashcards!
            </p>

            <div className="flex gap-6 justify-center flex-wrap">
              <div className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 min-w-[180px]">
                <Trophy className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="text-5xl font-bold text-green-400 mb-2">
                  {stats.known}
                </p>
                <p className="text-gray-400">Acertos</p>
              </div>

              <div className="bg-gradient-to-br from-red-600/30 to-pink-600/30 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 min-w-[180px]">
                <XCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                <p className="text-5xl font-bold text-red-400 mb-2">
                  {stats.unknown}
                </p>
                <p className="text-gray-400">Erros</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 min-w-[180px]">
                <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <p className="text-5xl font-bold text-purple-400 mb-2">
                  {Math.round(
                    (stats.known / (stats.known + stats.unknown)) * 100
                  )}
                  %
                </p>
                <p className="text-gray-400">Taxa</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg px-8 hover:from-purple-500 hover:to-pink-500 shadow-xl"
                onClick={restart}
                startContent={<RotateCcw className="w-5 h-5" />}
              >
                Praticar Novamente
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold text-lg px-8 hover:from-gray-600 hover:to-gray-700 shadow-xl"
                onClick={() => router.push('/')}
                startContent={<Home className="w-5 h-5" />}
              >
                Menu Principal
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Achievement Toast */}
      <AchievementToast
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </main>
  );
}
