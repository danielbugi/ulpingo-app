'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import { Volume2 } from 'lucide-react';
import { speakHebrew } from '@/lib/audio';

interface ReviewCardProps {
  wordPt: string;
  wordHe: string;
  transliteration: string;
  onRate: (rating: 'again' | 'hard' | 'good' | 'easy') => void;
  cardNumber: number;
  totalCards: number;
}

export default function ReviewCard({
  wordPt,
  wordHe,
  transliteration,
  onRate,
  cardNumber,
  totalCards,
}: ReviewCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitDirection, setExitDirection] = useState<string | null>(null);

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    setExitDirection(rating);
    setTimeout(() => {
      onRate(rating);
      setIsFlipped(false);
      setExitDirection(null);
    }, 400);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={cardNumber}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            x: exitDirection ? (exitDirection === 'again' ? -600 : 600) : 0,
          }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, type: 'spring', damping: 20 }}
          className="relative"
        >
          {/* Card counter */}
          <div className="absolute -top-3 -right-3 z-20">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm">
              {cardNumber} / {totalCards}
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => !isFlipped && setIsFlipped(true)}
            className="relative cursor-pointer"
          >
            {/* Front - Portuguese */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                position: isFlipped ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                width: '100%',
              }}
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-12 h-[400px] flex flex-col items-center justify-center">
                  <p className="text-sm text-purple-200 uppercase tracking-wider mb-6 font-semibold">
                    Português
                  </p>
                  <h2 className="text-7xl font-bold text-white text-center mb-8">
                    {wordPt}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Clique para ver a resposta
                  </p>
                </div>
              </div>
            </div>

            {/* Back - Hebrew */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                position: isFlipped ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
              }}
            >
              <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-12 h-[400px] flex flex-col items-center justify-center">
                  <p className="text-sm text-cyan-200 uppercase tracking-wider mb-6 font-semibold">
                    עברית
                  </p>
                  <h2
                    className="text-8xl font-bold text-white mb-6 text-center"
                    dir="rtl"
                  >
                    {wordHe}
                  </h2>
                  <p className="text-3xl text-cyan-200 font-light mb-8">
                    {transliteration}
                  </p>
                  <Button
                    isIconOnly
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakHebrew(wordHe);
                    }}
                  >
                    <Volume2 className="w-6 h-6 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rating buttons - only show when flipped */}
          {isFlipped && !exitDirection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 space-y-3"
            >
              <p className="text-center text-gray-400 mb-4 font-semibold">
                Como você se lembra desta palavra?
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Again - Red */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold hover:from-red-500 hover:to-red-400 shadow-xl"
                  onClick={() => handleRate('again')}
                >
                  <div className="text-center">
                    <div className="text-lg">❌ Errei</div>
                    <div className="text-xs opacity-80">&lt;1 min</div>
                  </div>
                </Button>

                {/* Hard - Orange */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold hover:from-orange-500 hover:to-orange-400 shadow-xl"
                  onClick={() => handleRate('hard')}
                >
                  <div className="text-center">
                    <div className="text-lg">😓 Difícil</div>
                    <div className="text-xs opacity-80">~1 dia</div>
                  </div>
                </Button>

                {/* Good - Green */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white font-bold hover:from-green-500 hover:to-green-400 shadow-xl"
                  onClick={() => handleRate('good')}
                >
                  <div className="text-center">
                    <div className="text-lg">✓ Bom</div>
                    <div className="text-xs opacity-80">~3 dias</div>
                  </div>
                </Button>

                {/* Easy - Blue */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold hover:from-blue-500 hover:to-blue-400 shadow-xl"
                  onClick={() => handleRate('easy')}
                >
                  <div className="text-center">
                    <div className="text-lg">😊 Fácil</div>
                    <div className="text-xs opacity-80">~1 semana</div>
                  </div>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
