'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Button, Chip, Progress } from '@heroui/react';
import {
  ArrowLeft,
  RotateCcw,
  Home,
  Trophy,
  Target,
  Award,
  XCircle,
  Flame,
  Volume2,
  VolumeX,
  Star,
} from 'lucide-react';
import MultipleChoice from '@/components/MultipleChoice';
import PageLoader from '@/components/PageLoader';
import AchievementToast from '@/components/AchievementToast';
import { XPGain, LevelUpModal } from '@/components/LevelDisplay';
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
import { updateGuestStats } from '@/lib/guest-session';
import { useSession } from 'next-auth/react';

interface Word {
  id: number;
  word_pt: string;
  word_he: string;
  transliteration: string;
}

interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  const { data: session } = useSession();
  const userId = useUserId();

  const [words, setWords] = useState<Word[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // New gamification state
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streakData, setStreakData] = useState(getStreakData());
  const [dailyGoal, setDailyGoal] = useState(getDailyGoal());
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [quizStats, setQuizStats] = useState<{
    isNewBest: boolean;
    isPerfect: boolean;
    attemptNumber: number;
    previousBest: number;
  } | null>(null);
  const [startTime] = useState(Date.now());

  // Initialize sound state
  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts([
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
        generateQuestions(data.words);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading words:', error);
        setIsLoading(false);
      });
  }, [categoryId]);

  const generateQuestions = (wordsList: Word[]) => {
    const generatedQuestions = wordsList.map((word) => {
      const wrongAnswers = wordsList
        .filter((w) => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.word_he);

      const allOptions = [word.word_he, ...wrongAnswers].sort(
        () => Math.random() - 0.5
      );

      return {
        id: word.id,
        question: word.word_pt,
        correctAnswer: word.word_he,
        options: allOptions,
      };
    });

    setQuestions(generatedQuestions);
  };

  const handleAnswer = async (isCorrect: boolean) => {
    if (questions[currentIndex]) {
      // Play sound based on answer
      if (isCorrect) {
        playSuccess();
      } else {
        playError();
      }

      const body: any = {
        wordId: questions[currentIndex].id,
        isCorrect,
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
        updateGuestStats(isCorrect);
      }

      const newScore = isCorrect ? score + 1 : score;
      if (isCorrect) {
        setScore(newScore);
      }

      // Update streak
      const newStreak = updateStreak();
      setStreakData(newStreak);

      // Update daily goal
      const newDailyGoal = updateDailyGoal(1);
      setDailyGoal(newDailyGoal);

      // Add XP for quiz answer (only for authenticated users)
      if (session?.user && isCorrect) {
        try {
          const xpResponse = await fetch('/api/xp/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customAmount: 15 }),
          });

          if (xpResponse.ok) {
            const xpData = await xpResponse.json();
            setXpGained(xpData.xpGained);
            setShowXpGain(true);
            setTimeout(() => setShowXpGain(false), 3000);

            // Check if leveled up
            if (xpData.leveledUp) {
              setNewLevel(xpData.newLevel);
              setShowLevelUp(true);
            }
          }
        } catch (error) {
          console.error('Error adding XP:', error);
        }
      }
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);

        // Save quiz attempt
        if (session?.user) {
          try {
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            const saveResponse = await fetch('/api/quiz/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                categoryId: parseInt(categoryId),
                totalQuestions: questions.length,
                correctAnswers: newScore,
                timeTaken,
              }),
            });

            if (saveResponse.ok) {
              const saveData = await saveResponse.json();
              setQuizStats(saveData.stats);
            }
          } catch (error) {
            console.error('Error saving quiz attempt:', error);
          }
        }

        // Check for perfect quiz achievement
        const newAchievements = checkAchievements({
          wordsLearned: newScore,
          currentStreak: newStreak.currentStreak,
          quizScore: newScore,
          totalQuestions: questions.length,
        });

        if (newAchievements.length > 0) {
          setCurrentAchievement(newAchievements[0]);
        }
      }
    }
  };

  const restart = () => {
    playClick();
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    generateQuestions(words);
  };

  const handleSoundToggle = () => {
    const enabled = toggleSound();
    setSoundEnabled(enabled);
    playClick();
  };

  if (isLoading) {
    return <PageLoader message="Preparando o quiz..." color="cyan" />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-2xl mb-4">
            😕 Nenhuma pergunta encontrada
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold"
            startContent={<Home />}
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / questions.length) * 100);
  const isPerfect = score === questions.length;
  const isGood = percentage >= 70;

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
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
            <p className="text-cyan-400 font-semibold">Quiz</p>
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

        {/* Streak and Daily Goal */}
        {!isComplete && (
          <div className="flex gap-4 mb-6">
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
        )}

        {/* Score Display */}
        {!isComplete && (
          <div className="mb-8 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-full px-8 py-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-cyan-400" />
                <span className="text-2xl font-bold text-white">
                  {score} / {questions.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quiz or Results */}
        {!isComplete ? (
          <MultipleChoice
            question={questions[currentIndex].question}
            correctAnswer={questions[currentIndex].correctAnswer}
            options={questions[currentIndex].options}
            onAnswer={handleAnswer}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
          />
        ) : null}

        {!isComplete && (
          <div className="mt-4 text-center text-white/40 text-sm">
            💡 Dica: Use R = Reiniciar | Esc = Voltar
          </div>
        )}

        {isComplete && (
          <div className="text-center space-y-8 py-12">
            {/* Trophy/Medal Animation */}
            <div className="text-9xl animate-bounce">
              {isPerfect ? '🏆' : isGood ? '🎉' : '💪'}
            </div>

            {/* Title */}
            <div>
              <h2 className="text-5xl font-bold text-white mb-4">
                {isPerfect
                  ? 'Perfeito!'
                  : isGood
                  ? 'Muito Bem!'
                  : 'Continue Praticando!'}
              </h2>
              <p className="text-xl text-gray-400">
                Você acertou {score} de {questions.length} perguntas
              </p>
            </div>

            {/* Quiz Statistics */}
            {quizStats && (
              <div className="flex justify-center gap-4 flex-wrap max-w-2xl mx-auto">
                {quizStats.isNewBest && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl px-6 py-3"
                  >
                    <div className="text-yellow-400 font-bold text-lg flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Novo Recorde Pessoal!
                    </div>
                  </motion.div>
                )}
                {quizStats.isPerfect && quizStats.attemptNumber > 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl px-6 py-3"
                  >
                    <div className="text-purple-400 font-bold flex items-center gap-2">
                      🎯 100% Perfeito!
                    </div>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl px-6 py-3"
                >
                  <div className="text-sm text-gray-400">Tentativa</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    #{quizStats.attemptNumber}
                  </div>
                </motion.div>
                {quizStats.previousBest > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl px-6 py-3"
                  >
                    <div className="text-sm text-gray-400">Melhor Anterior</div>
                    <div className="text-2xl font-bold text-green-400">
                      {quizStats.previousBest}%
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Score Circle */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-cyan-600/30 to-purple-600/30 backdrop-blur-xl border-4 border-cyan-500/50 rounded-full p-12 w-64 h-64 flex flex-col items-center justify-center">
                <Award className="w-12 h-12 text-cyan-400 mb-3" />
                <p className="text-7xl font-bold text-white mb-2">
                  {percentage}%
                </p>
                <p className="text-gray-400">Taxa de acerto</p>
              </div>
            </div>

            {/* Performance Message */}
            <div
              className={`
              max-w-md mx-auto p-6 rounded-2xl backdrop-blur-xl border-2
              ${
                isPerfect
                  ? 'bg-yellow-500/20 border-yellow-500/50'
                  : isGood
                  ? 'bg-green-500/20 border-green-500/50'
                  : 'bg-blue-500/20 border-blue-500/50'
              }
            `}
            >
              <p className="text-white text-lg">
                {isPerfect
                  ? '🌟 Incrível! Você dominou todas as palavras!'
                  : isGood
                  ? '✨ Ótimo trabalho! Continue assim!'
                  : '📚 Não desista! A prática leva à perfeição!'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg px-8 hover:from-cyan-500 hover:to-blue-500 shadow-xl"
                onClick={restart}
                startContent={<RotateCcw className="w-5 h-5" />}
              >
                Tentar Novamente
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

      {/* XP Gain Toast */}
      {showXpGain && <XPGain amount={xpGained} />}

      {/* Level Up Modal */}
      {showLevelUp && (
        <LevelUpModal
          newLevel={newLevel}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </main>
  );
}
