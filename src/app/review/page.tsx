'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Progress } from '@heroui/react';
import { ArrowLeft, Home, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard';
import { useUserId } from '@/lib/hooks/useUserId';
import { updateGuestStats } from '@/lib/guest-session';
import { useSession } from 'next-auth/react';

interface Word {
  id: number;
  word_pt: string;
  word_he: string;
  transliteration: string;
}

export default function ReviewPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = useUserId();
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadDueWords();
    }
  }, [userId]);

  const loadDueWords = async () => {
    setIsLoading(true);
    try {
      const url =
        typeof userId === 'string'
          ? `/api/review?guestId=${encodeURIComponent(userId)}`
          : '/api/review';
      const res = await fetch(url);
      const data = await res.json();
      setWords(data.words);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading due words:', error);
      setIsLoading(false);
    }
  };

  const handleRate = async (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (words[currentIndex]) {
      const body: any = {
        wordId: words[currentIndex].id,
        rating,
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
        const isCorrect = rating === 'good' || rating === 'easy';
        updateGuestStats(isCorrect);
      }

      setReviewCount(reviewCount + 1);

      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-t-4 border-purple-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-white text-xl font-semibold animate-pulse">
            Carregando revisões...
          </p>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>

        <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
          <div className="text-8xl mb-8 animate-bounce">🎉</div>
          <h2 className="text-5xl font-bold text-white mb-4">Tudo em dia!</h2>
          <p className="text-xl text-gray-400 mb-8">
            Você não tem palavras para revisar agora.
            <br />
            Continue estudando ou volte mais tarde!
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                startContent={<Home className="w-5 h-5" />}
              >
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>

        <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
          <div className="text-8xl mb-8 animate-bounce">🏆</div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Revisão Completa!
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Você revisou {reviewCount}{' '}
            {reviewCount === 1 ? 'palavra' : 'palavras'}!
            <br />
            Continue assim e você vai dominar o hebraico!
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
                startContent={<Home className="w-5 h-5" />}
              >
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0 justify-between items-center">
            <Button
              variant="light"
              startContent={<ArrowLeft className="w-5 h-5" />}
              className="text-white w-full sm:w-auto"
              onClick={() => router.push('/')}
            >
              Voltar
            </Button>

            <div className="flex items-center gap-2 bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-4 py-2 sm:px-6 sm:py-3 mt-2 sm:mt-0">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span className="text-white font-bold text-base sm:text-lg">
                Revisão do Dia
              </span>
            </div>

            <Button
              variant="light"
              startContent={<Home className="w-5 h-5" />}
              className="text-white w-full sm:w-auto"
              onClick={() => router.push('/')}
            >
              Início
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="max-w-lg mx-auto mb-8 space-y-4">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4">
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

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">
                {reviewCount} palavra{reviewCount !== 1 ? 's' : ''} revisada
                {reviewCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Review Card */}
        <ReviewCard
          wordPt={words[currentIndex].word_pt}
          wordHe={words[currentIndex].word_he}
          transliteration={words[currentIndex].transliteration}
          onRate={handleRate}
          cardNumber={currentIndex + 1}
          totalCards={words.length}
        />
      </div>
    </main>
  );
}
