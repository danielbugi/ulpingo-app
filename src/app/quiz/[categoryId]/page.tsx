'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Chip } from '@heroui/react';
import {
  ArrowLeft,
  RotateCcw,
  Home,
  Trophy,
  Target,
  Award,
  XCircle,
} from 'lucide-react';
import MultipleChoice from '@/components/MultipleChoice';

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

  const [words, setWords] = useState<Word[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
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
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wordId: questions[currentIndex].id, isCorrect }),
      });

      if (isCorrect) {
        setScore(score + 1);
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    generateQuestions(words);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="text-center relative z-10">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-500/30 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-t-4 border-cyan-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-white text-xl font-semibold animate-pulse">
            Preparando o quiz...
          </p>
        </div>
      </div>
    );
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
            onClick={() => router.push('/')}
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

          <Button
            isIconOnly
            variant="light"
            onClick={restart}
            className="text-white hover:bg-white/10"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>

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
        ) : (
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
    </main>
  );
}
