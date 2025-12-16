'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementToast({
  achievement,
  onClose,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-2xl border border-white/20 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  {achievement.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <h3 className="text-white font-bold text-sm">
                    Conquista Desbloqueada!
                  </h3>
                </div>
                <p className="text-white font-semibold text-base mb-1">
                  {achievement.name}
                </p>
                <p className="text-white/90 text-sm">
                  {achievement.description}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                aria-label="Fechar notificação"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-1 -left-1 w-8 h-8 bg-yellow-400 rounded-full blur-md opacity-50"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-400 rounded-full blur-md opacity-50"></div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-1 bg-white/30 rounded-full mt-2"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
