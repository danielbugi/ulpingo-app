'use client';

import { motion } from 'framer-motion';
import { Progress, Card, CardBody, Chip } from '@heroui/react';
import { Trophy, Zap, Star, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  LevelProgress,
  getLevelTitle,
  formatXp,
  getRarityColor,
} from '@/lib/level-system';

interface LevelDisplayProps {
  progress: LevelProgress;
  showDetails?: boolean;
  compact?: boolean;
}

export default function LevelDisplay({
  progress,
  showDetails = true,
  compact = false,
}: LevelDisplayProps) {
  const levelTitle = getLevelTitle(progress.currentLevel);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold">
            Nível {progress.currentLevel}
          </span>
        </div>
        <div className="flex-1 max-w-xs">
          <Progress
            value={progress.progressPercent}
            className="h-2"
            color="warning"
          />
        </div>
        <span className="text-sm text-gray-600">
          {formatXp(progress.currentXp)} /{' '}
          {formatXp(progress.xpForNextLevel - progress.xpForCurrentLevel)} XP
        </span>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardBody>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Trophy className="w-10 h-10 text-yellow-500" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">
                  Nível {progress.currentLevel}
                </h3>
                <p className={`text-sm font-semibold ${levelTitle.color}`}>
                  {levelTitle.pt} • {levelTitle.he}
                </p>
              </div>
            </div>

            <Chip
              startContent={<Zap className="w-4 h-4" />}
              variant="flat"
              color="warning"
              size="lg"
            >
              {formatXp(progress.currentXp)} XP
            </Chip>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Progresso para Nível {progress.currentLevel + 1}
              </span>
              <span className="font-semibold text-warning">
                {progress.progressPercent}%
              </span>
            </div>

            <Progress
              value={progress.progressPercent}
              className="h-3"
              color="warning"
              classNames={{
                indicator: 'bg-gradient-to-r from-yellow-400 to-orange-500',
              }}
            />

            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatXp(progress.currentXp)} XP</span>
              <span>Faltam {formatXp(progress.xpNeededForNextLevel)} XP</span>
            </div>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-gray-600">XP Total</p>
                  <p className="font-semibold">
                    {formatXp(progress.currentXp + progress.xpForCurrentLevel)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-gray-600">Próximo Nível</p>
                  <p className="font-semibold">
                    {formatXp(progress.xpForNextLevel)} XP
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

// Level Up Animation Component
interface LevelUpModalProps {
  newLevel: number;
  onClose: () => void;
}

export function LevelUpModal({ newLevel, onClose }: LevelUpModalProps) {
  const levelTitle = getLevelTitle(newLevel);

  // Trigger confetti on mount
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 200);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: 'spring', damping: 15 }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-96 border-4 border-yellow-400 shadow-2xl bg-gradient-to-br from-purple-900 to-black">
          <CardBody className="p-8 text-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: 2,
              }}
            >
              <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-500" />
            </motion.div>

            <motion.h2
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              Parabéns!
            </motion.h2>

            <motion.p
              className="text-xl text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Você subiu de nível!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <p className="text-7xl font-bold text-yellow-400 mb-2">
                Nível {newLevel}
              </p>
              <p className={`text-2xl font-semibold ${levelTitle.color}`}>
                {levelTitle.pt}
              </p>
              <p className="text-lg text-gray-400">{levelTitle.he}</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Continuar Estudando! 🚀
            </motion.button>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// XP Gain Animation
interface XPGainProps {
  amount: number;
  reason?: string;
}

export function XPGain({ amount, reason }: XPGainProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="fixed top-20 right-4 z-50"
    >
      <Card className="border-2 border-yellow-400 shadow-lg">
        <CardBody className="flex flex-row items-center gap-2 p-3">
          <Zap className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-lg font-bold text-yellow-600">
              +{formatXp(amount)} XP
            </p>
            {reason && <p className="text-xs text-gray-600">{reason}</p>}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
