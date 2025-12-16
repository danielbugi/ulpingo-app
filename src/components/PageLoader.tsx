import React from 'react';

interface PageLoaderProps {
  message?: string;
  color?: 'purple' | 'cyan' | 'pink';
}

export default function PageLoader({
  message = 'Carregando...',
  color = 'purple',
}: PageLoaderProps) {
  const colorMap = {
    purple: {
      orb1: 'bg-purple-500/30',
      orb2: 'bg-cyan-500/20',
      spinner: 'border-purple-500',
      spinnerBg: 'border-purple-500/30',
    },
    cyan: {
      orb1: 'bg-cyan-500/30',
      orb2: 'bg-purple-500/20',
      spinner: 'border-cyan-500',
      spinnerBg: 'border-cyan-500/30',
    },
    pink: {
      orb1: 'bg-pink-500/30',
      orb2: 'bg-purple-500/20',
      spinner: 'border-pink-500',
      spinnerBg: 'border-pink-500/30',
    },
  };

  const colors = colorMap[color];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      <div
        className={`absolute top-20 left-10 w-72 h-72 ${colors.orb1} rounded-full blur-3xl animate-pulse`}
      ></div>
      <div
        className={`absolute bottom-20 right-10 w-96 h-96 ${colors.orb2} rounded-full blur-3xl animate-pulse`}
      ></div>

      <div className="text-center relative z-10">
        <div className="relative">
          <div
            className={`w-20 h-20 border-4 ${colors.spinnerBg} rounded-full animate-spin mx-auto mb-4`}
          ></div>
          <div
            className={`absolute inset-0 w-20 h-20 border-t-4 ${colors.spinner} rounded-full animate-spin mx-auto`}
          ></div>
        </div>
        <p className="text-white text-xl font-semibold animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
