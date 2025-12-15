export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute animate-ping left-[25%] top-[30%] delay-0">
          <div className="w-4 h-4 bg-purple-500 rounded-full opacity-20"></div>
        </div>
        <div className="absolute animate-ping left-[45%] top-[45%] delay-300">
          <div className="w-4 h-4 bg-purple-500 rounded-full opacity-20"></div>
        </div>
        <div className="absolute animate-ping left-[65%] top-[60%] delay-700">
          <div className="w-4 h-4 bg-purple-500 rounded-full opacity-20"></div>
        </div>
        <div className="absolute animate-ping left-[85%] top-[75%] delay-1000">
          <div className="w-4 h-4 bg-purple-500 rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center px-4">
        {/* Hebrew letter spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
            <div
              className="text-6xl font-bold text-gradient"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              א
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center animate-spin"
            style={{ animationDuration: '4s', animationDirection: 'reverse' }}
          >
            <div
              className="text-6xl font-bold text-gradient opacity-50"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              ב
            </div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center animate-spin-slow"
            style={{ animationDuration: '5s' }}
          >
            <div
              className="text-6xl font-bold text-gradient opacity-30"
              style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
            >
              ג
            </div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-semibold mb-3 animate-pulse">
          Carregando...
        </h2>
        <p
          className="text-lg text-white/60"
          dir="rtl"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          ...טוען
        </p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Random encouraging message */}
        <div className="mt-8 text-sm text-white/40 animate-pulse">
          <p>Preparando seu aprendizado... 📚</p>
        </div>
      </div>
    </div>
  );
}
