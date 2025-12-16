'use client';

import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingState({
  message = 'Carregando...',
  fullScreen = true,
}: LoadingStateProps) {
  const content = (
    <div className="text-center">
      <div className="relative">
        <motion.div
          className="w-20 h-20 border-4 border-purple-500/30 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 w-20 h-20 border-t-4 border-purple-500 rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      <motion.p
        className="text-white text-xl font-semibold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {message}
      </motion.p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">{content}</div>
  );
}

// Skeleton loader for cards
export function CardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 animate-pulse">
      <div className="w-16 h-16 bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-gray-700 rounded"></div>
        <div className="flex-1 h-10 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
