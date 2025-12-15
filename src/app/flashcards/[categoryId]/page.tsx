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
} from 'lucide-react';
import FlashCard from '@/components/FlashCard';
import { useUserId } from '@/lib/hooks/useUserId';
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

      setStats((prev) => ({ ...prev, known: prev.known + 1 }));
      nextCard();
    }
  };

  const handleDontKnow = async () => {
    if (words[currentIndex]) {
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

      setStats((prev) => ({ ...prev, unknown: prev.unknown + 1 }));
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
    setCurrentIndex(0);
    setStats({ known: 0, unknown: 0 });
    setIsComplete(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="text-center relative z-10">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-t-4 border-purple-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-white text-xl font-semibold animate-pulse">
            Carregando flashcards...
          </p>
        </div>
      </div>
    );
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
            onClick={() => router.push('/')}
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

          <Button
            isIconOnly
            variant="light"
            onClick={restart}
            className="text-white hover:bg-white/10"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>

        {/* Progress Stats */}
        <div className="mb-8 space-y-4">
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
    </main>
  );
}
