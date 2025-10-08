'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Progress, Chip } from '@heroui/react';
import { CheckCircle2, XCircle, Sparkles, Zap } from 'lucide-react';
import { speakHebrew } from '@/lib/audio';

interface MultipleChoiceProps {
  question: string;
  correctAnswer: string;
  options: string[];
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function MultipleChoice({
  question,
  correctAnswer,
  options,
  onAnswer,
  questionNumber,
  totalQuestions,
}: MultipleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    if (showResult) return;

    setSelectedAnswer(option);
    setShowResult(true);

    const isCorrect = option === correctAnswer;

    // Play audio ONLY if correct answer
    if (isCorrect) {
      setTimeout(() => {
        speakHebrew(correctAnswer);
      }, 500);
    }

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1800);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={questionNumber}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ duration: 0.4, type: 'spring', damping: 20 }}
        >
          {/* Progress section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">
                  Pergunta {questionNumber} de {totalQuestions}
                </span>
              </div>
              <span className="text-gray-400 font-semibold">
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={(questionNumber / totalQuestions) * 100}
                className="h-3"
                classNames={{
                  indicator: 'bg-gradient-to-r from-purple-500 to-pink-500',
                }}
              />
            </div>
          </div>

          {/* Question card */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30"></div>

              <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl p-1">
                <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <p className="text-purple-200 text-sm uppercase tracking-wider font-semibold">
                      Qual é a tradução em hebraico?
                    </p>
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>

                  <h2 className="text-6xl font-bold text-white text-center">
                    {question}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === correctAnswer;
              const showCorrect = showResult && isCorrectOption;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    type: 'spring',
                    damping: 15,
                  }}
                >
                  <button
                    onClick={() => handleSelect(option)}
                    disabled={showResult}
                    className={`
                      w-full p-6 rounded-2xl text-2xl font-bold transition-all duration-300
                      ${
                        !showResult &&
                        'hover:scale-105 hover:shadow-2xl cursor-pointer'
                      }
                      ${showResult && 'cursor-not-allowed'}
                      ${
                        !showResult &&
                        'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 text-white hover:border-purple-500'
                      }
                      ${
                        showCorrect &&
                        'bg-gradient-to-br from-green-600 to-emerald-600 border-2 border-green-400 text-white shadow-green-500/50 shadow-2xl scale-105'
                      }
                      ${
                        showWrong &&
                        'bg-gradient-to-br from-red-600 to-pink-600 border-2 border-red-400 text-white shadow-red-500/50 shadow-2xl scale-95'
                      }
                      ${
                        showResult &&
                        !isSelected &&
                        !isCorrectOption &&
                        'opacity-30 scale-95'
                      }
                    `}
                    dir="rtl"
                  >
                    <div className="flex items-center justify-center gap-3">
                      {showCorrect && (
                        <CheckCircle2 className="w-8 h-8 animate-bounce" />
                      )}
                      {showWrong && (
                        <XCircle className="w-8 h-8 animate-pulse" />
                      )}
                      <span>{option}</span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Result feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15 }}
                className="mt-8"
              >
                <div
                  className={`
                  rounded-2xl p-6 text-center backdrop-blur-xl border-2
                  ${
                    isCorrect
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'bg-red-500/20 border-red-500/50'
                  }
                `}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isCorrect ? (
                      <>
                        <div className="text-4xl animate-bounce">🎉</div>
                        <span className="text-2xl font-bold text-green-400">
                          Parabéns! Resposta correta!
                        </span>
                        <div className="text-4xl animate-bounce">🎉</div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl">😔</div>
                        <div className="text-xl font-bold text-red-400">
                          Não foi dessa vez!
                          <div className="text-base text-gray-300 mt-2">
                            A resposta era:{' '}
                            <span className="text-green-400" dir="rtl">
                              {correctAnswer}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
