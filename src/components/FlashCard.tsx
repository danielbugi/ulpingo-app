'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Volume2, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { speakHebrew } from '@/lib/audio';

interface FlashCardProps {
  wordPt: string;
  wordHe: string;
  transliteration: string;
  onKnow: () => void;
  onDontKnow: () => void;
  cardNumber: number;
  totalCards: number;
}

export default function FlashCard({
  wordPt,
  wordHe,
  transliteration,
  onKnow,
  onDontKnow,
  cardNumber,
  totalCards,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(
    null
  );

  const handleKnow = () => {
    setExitDirection('right');
    setTimeout(() => {
      onKnow();
      setIsFlipped(false);
      setExitDirection(null);
    }, 400);
  };

  const handleDontKnow = () => {
    setExitDirection('left');
    setTimeout(() => {
      onDontKnow();
      setIsFlipped(false);
      setExitDirection(null);
    }, 400);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={cardNumber}
          initial={{ scale: 0.9, opacity: 0, y: 20, rotateY: -15 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            rotateY: 0,
            x:
              exitDirection === 'left'
                ? -600
                : exitDirection === 'right'
                ? 600
                : 0,
            rotate:
              exitDirection === 'left'
                ? -45
                : exitDirection === 'right'
                ? 45
                : 0,
          }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            type: 'spring',
            damping: 20,
          }}
          className="relative"
        >
          {/* Card counter badge */}
          <div className="absolute -top-3 -right-3 z-20">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm">
              {cardNumber} / {totalCards}
            </div>
          </div>

          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', damping: 15 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative cursor-pointer"
            onClick={() => !exitDirection && setIsFlipped(!isFlipped)}
          >
            {/* Front side - Portuguese */}
            <div
              className="relative"
              style={{
                backfaceVisibility: 'hidden',
                position: isFlipped ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                width: '100%',
                transform: 'rotateY(0deg)',
              }}
            >
              <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-12 h-[400px] flex flex-col items-center justify-center">
                  <Sparkles className="w-8 h-8 text-yellow-400 mb-4 animate-pulse" />

                  <p className="text-sm text-purple-200 uppercase tracking-wider mb-6 font-semibold">
                    Português
                  </p>

                  <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 text-center break-words max-w-full px-4">
                    {wordPt}
                  </h2>

                  <div className="flex items-center gap-2 text-purple-200">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <p className="text-sm">Toque para virar</p>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back side - Hebrew */}
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
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-center break-words max-w-full px-4"
                    dir="rtl"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {wordHe}
                  </h2>

                  <p className="text-2xl sm:text-3xl text-cyan-200 font-light mb-8 break-words max-w-full px-4 text-center">
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

          {/* Action buttons - only show when flipped */}
          {isFlipped && !exitDirection && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className="flex gap-4 mt-8"
            >
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg py-7 hover:from-red-500 hover:to-pink-500 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                startContent={<XCircle className="w-6 h-6" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDontKnow();
                }}
              >
                Não sei
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg py-7 hover:from-green-500 hover:to-emerald-500 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                startContent={<CheckCircle2 className="w-6 h-6" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleKnow();
                }}
              >
                Sei
              </Button>
            </motion.div>
          )}

          {/* Hint text when not flipped */}
          {!isFlipped && !exitDirection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6"
            >
              <p className="text-gray-500 text-sm">
                💡 Clique no card para ver a tradução
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
